import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthResponse, login, logout, register, forgotPassword, resetPassword } from '@/api/auth';

type AuthState = {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

type User<T = any> = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
} & T;

type Action =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: AuthResponse }
  | { type: 'LOGIN_FAILURE'; payload: string | null }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: AuthResponse }
  | { type: 'REGISTER_FAILURE'; payload: string | null };

type AuthContextType = AuthState & {
  login: (credentials: User) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: User) => Promise<void>;
  clearError: () => void;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('auth_token');
      if (token) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: null, token } });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };
    loadToken();
  }, []);


  const handleLogin = async (credentials: User) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await login(credentials);

      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data?.message || 'Login failed' });
      throw error;
    }
  };

  const handleRegister = async (user: User) => {
    try {
      dispatch({ type: 'REGISTER_START' });
      const response = await register(user);
      ;
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (error: any) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.response?.data?.message || 'Registration failed' });
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      await SecureStore.deleteItemAsync('auth_token');

      const token = await SecureStore.getItemAsync('auth_token');
      if (!token) {
        dispatch({ type: 'LOGOUT' });
      } else {
        console.warn('Token masih ada setelah logout!');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  const handleForgotPassword = async (email: string) => {
    try {
      await forgotPassword(email);
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  };

  const handleResetPassword = async (data: User) => {
    try {
      await resetPassword(data);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'LOGIN_FAILURE', payload: null });
    dispatch({ type: 'REGISTER_FAILURE', payload: null });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        forgotPassword: handleForgotPassword,
        resetPassword: handleResetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);