import axios, { AxiosError, type AxiosInstance } from 'axios';
import { apiClient } from '../openapi';
import { env } from '../../config/env';
import { accessTokenStorage } from '../auth';

export const $api: AxiosInstance = axios.create({
  baseURL: env.STATE_API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = accessTokenStorage.get();
  if (token) {
    config.headers = config.headers ?? {};

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

async function refreshAccessToken(): Promise<string> {
  const response = await apiClient.auth.refresh({}, { skipAuthRefresh: true });

  const token = response.data.access_token;

  if (!token) {
    throw new Error('Access_token is missing');
  }

  accessTokenStorage.set(token);

  return token;
}

let refreshPromise: Promise<string> | null = null;

async function getRefreshedToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

$api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest._retry || originalRequest.skipAuthRefresh) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    try {
      const token = await getRefreshedToken();

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${token}`;

      return $api.request(originalRequest);
    } catch (refreshError) {
      accessTokenStorage.clear();
      return Promise.reject(refreshError);
    }
  },
);
