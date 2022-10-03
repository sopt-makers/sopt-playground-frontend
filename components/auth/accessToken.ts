import { decode } from 'jsonwebtoken';

import { axiosInstance } from '@/api';

const ACCESS_TOKEN_KEY = 'serviceAccessToken';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken: string) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function loadAccessToken() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return null;
  }

  if (!safeDecodeAccessToken(accessToken)) {
    removeAccessToken();
    return null;
  }

  setAccessToken(accessToken);

  return accessToken;
}

function safeDecodeAccessToken(token: string) {
  try {
    const content = decode(token);

    if (typeof content === 'string' || !content) {
      return null;
    }

    const exp = content.exp ?? 0;

    if (exp < Date.now() / 1000) {
      return null;
    }

    return content;
  } catch {
    return null;
  }
}
