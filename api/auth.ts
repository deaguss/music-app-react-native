import api from './axios';
import { AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

export const TOKEN_KEY = 'auth_token';
export const USER_KEY = 'auth_user';

export interface User {
  name?: string;
  email: string;
  password: string;
  device_name: string;
  password_confirmation?: string;
}

export interface AuthResponse {
  status: string;
  user: any;
  message: string;
  token: string;
}

export const persistAuthState = async (token: string, user: any) => {
  await Promise.all([
    SecureStore.setItemAsync(TOKEN_KEY, token),
    SecureStore.setItemAsync(USER_KEY, JSON.stringify(user)),
  ]);
};

export const clearAuthState = async () => {
  await Promise.all([
    SecureStore.deleteItemAsync(TOKEN_KEY),
    SecureStore.deleteItemAsync(USER_KEY),
  ]);
};

export const login = async (credentials: User): Promise<AxiosResponse<AuthResponse>> => {
  return await api.post('/login', credentials);
};

export const register = async (userData: User): Promise<AxiosResponse<AuthResponse>> => {
  return await api.post('/register', userData);
};

export const logout = async (): Promise<AxiosResponse> => {
  return await api.post('/logout');
};

export const forgotPassword = async (email: string): Promise<AxiosResponse> => {
  return await api.post('/forgot-password', { email });
};

export const resetPassword = async (data: User & { token: string }): Promise<AxiosResponse> => {
  return await api.post('/reset-password', data);
};