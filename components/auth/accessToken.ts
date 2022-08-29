import { axiosInstance } from '@/api';

const ACCESS_TOKEN_KEY = 'serviceAccessToken';

export function setAccessToken(accessToken: string) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function loadAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) {
    setAccessToken(accessToken);
  }
}
