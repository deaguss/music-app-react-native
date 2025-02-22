import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {
  User,
  TOKEN_KEY,
  USER_KEY,
  login,
  register,
  logout,
  persistAuthState,
  clearAuthState,
} from '@/api/auth';
import { Platform } from 'react-native';

export enum AuthActionTypes {
  AUTH_START = 'AUTH_START',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILURE = 'AUTH_FAILURE',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  SET_LOADING = 'SET_LOADING',
}

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: AuthActionTypes.AUTH_START }
  | { type: AuthActionTypes.AUTH_SUCCESS; payload: { user: any; token: string } }
  | { type: AuthActionTypes.AUTH_FAILURE; payload: string | null }
  | { type: AuthActionTypes.AUTH_LOGOUT }
  | { type: AuthActionTypes.SET_LOADING; payload: boolean };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case AuthActionTypes.AUTH_START:
      return { ...state, loading: true, error: null };
    case AuthActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case AuthActionTypes.AUTH_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case AuthActionTypes.AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case AuthActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (credentials: User) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const initializeAuth = useCallback(async () => {
    try {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: true });
      const [token, userStr] = await Promise.all([
        SecureStore.getItemAsync(TOKEN_KEY),
        SecureStore.getItemAsync(USER_KEY),
      ]);

      if (token && userStr) {
        const user = JSON.parse(userStr);
        dispatch({
          type: AuthActionTypes.AUTH_SUCCESS,
          payload: { token, user },
        });
      } else {
        dispatch({ type: AuthActionTypes.AUTH_LOGOUT });
      }
    } catch (error) {
      dispatch({ type: AuthActionTypes.AUTH_LOGOUT });
    } finally {
      dispatch({ type: AuthActionTypes.SET_LOADING, payload: false });
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleLogin = useCallback(
    async (credentials: User) => {
      const data = {
        email: credentials.email,
        password: credentials.password,
        device_name: `${Platform.OS} ${Platform.Version}`,
      };

      try {
        dispatch({ type: AuthActionTypes.AUTH_START });
        const response = await login(data);

        if (response.data.token) {
          const user = { email: credentials.email };
          await persistAuthState(response.data.token, user);
          dispatch({
            type: AuthActionTypes.AUTH_SUCCESS,
            payload: { token: response.data.token, user },
          });
        } else if (response.data.status === 'error') {
          throw new Error(response.data.message);
        } else {
          throw new Error('Login failed: No token received');
        }
      } catch (error: any) {
        console.error('Login error:', error);
        const errorMessage =
          error.response?.data?.message || error.message || 'Login failed';
        dispatch({ type: AuthActionTypes.AUTH_FAILURE, payload: errorMessage });
        throw new Error(errorMessage);
      }
    },
    []
  );

  const handleRegister = useCallback(
    async (userData: User) => {
      const data = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
        device_name: `${Platform.OS} ${Platform.Version}`,
      };

      try {
        dispatch({ type: AuthActionTypes.AUTH_START });
        const response = await register(data);

        if (response.data.status === 'success' && response.data.token) {
          const user = { name: userData.name, email: userData.email };
          await persistAuthState(response.data.token, user);
          dispatch({
            type: AuthActionTypes.AUTH_SUCCESS,
            payload: { token: response.data.token, user },
          });
        } else if (response.data.status === 'error') {
          throw new Error(response.data.message!);
        } else {
          throw new Error('Registration failed: Invalid response format');
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Registration failed';
        dispatch({ type: AuthActionTypes.AUTH_FAILURE, payload: errorMessage });
        throw new Error(errorMessage);
      }
    },
    []
  );

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await clearAuthState();
      dispatch({ type: AuthActionTypes.AUTH_LOGOUT });
      router.replace('/sign-in');
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: AuthActionTypes.AUTH_FAILURE, payload: null });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
      clearError,
    }),
    [state, handleLogin, handleRegister, handleLogout, clearError]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
