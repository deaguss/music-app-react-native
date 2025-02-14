import axios, { AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

export const BASE_URL = 'http://10.0.2.2:8000';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * @param {Object} response 
 * @returns {string|null} 
 */
const extractCsrfToken = (response: AxiosResponse) => {
  const setCookieHeader = response.headers['set-cookie'];
  if (setCookieHeader && setCookieHeader.length) {

    const xsrfCookie = setCookieHeader.find((cookie) =>
      cookie.startsWith('XSRF-TOKEN=')
    );
    if (xsrfCookie) {
      const token = xsrfCookie.split(';')[0].split('=')[1];
      return decodeURIComponent(token);
    }
  }
  return null;
};

/**

 * @returns {Promise<Object>}
 */
export const getCsrf = async () => {
  try {
    const response = await api.get('/sanctum/csrf-cookie');
    const token = extractCsrfToken(response);

    if (token) {
      await SecureStore.setItemAsync('auth_token', token);
    } else {
      console.warn('CSRF token not fount in response.');
    }

    return response;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) config.headers['X-XSRF-TOKEN'] = token;
  return config;
});

export default api;
