import { number, object } from 'yup';

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
    const encodedSegment = token.split('.')[1];
    const segment = JSON.parse(window.atob(encodedSegment)) as unknown;

    const jwtHeader = hasExp.validateSync(segment);

    const exp = jwtHeader.exp;

    if (exp < Date.now() / 1000) {
      return null;
    }

    return segment;
  } catch (e) {
    console.log(e);
    return null;
  }
}

const hasExp = object({
  exp: number().required(),
});
