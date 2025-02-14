import api, { getCsrf } from './axios';
import { AxiosResponse } from 'axios';

export interface User {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: any;
  token: string;
}

export const register = async (user: User): Promise<AxiosResponse<AuthResponse>> => {
  await getCsrf();
  return await api.post('/register', user);

};

export const login = async (user: User): Promise<AxiosResponse<AuthResponse>> => {
  await getCsrf();

  return await api.post('/login', user);
};

export const logout = async (): Promise<AxiosResponse> => {
  await getCsrf();
  return await api.post('/logout');
};

export const forgotPassword = async (email: string): Promise<AxiosResponse> => {
  await getCsrf();
  return  await api.post('/forgot-password', { email });
};

export const resetPassword = async (data: {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<AxiosResponse> => {
  await getCsrf();
  return await api.post('/reset-password', data);
};