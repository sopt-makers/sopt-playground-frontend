import axios, { AxiosError } from 'axios';

import { tokenStorage } from '@/components/auth/util/accessToken';
import { ADMIN_API_KEY, ADMIN_API_URL, API_URL, AUTH_API_URL, OPERATION_API_URL } from '@/constants/env';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
});

export const axiosAuthInstance = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosAdminInstance = axios.create({
  baseURL: ADMIN_API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'api-key': ADMIN_API_KEY,
  },
});

// 어드민 운영 프로덕트 API 연결을 위한 axiosInstance
export const axiosOperationInstance = axios.create({
  baseURL: OPERATION_API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'api-key': ADMIN_API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.get();
    if (token && config.headers && config.headers.Authorization === undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => handleTokenError(err),
);

export const handleTokenError = async (error: AxiosError<unknown>) => {
  const originRequest = error.config;

  if (!error.response || !originRequest) throw new Error('에러가 발생했습니다.');

  const { status } = error.response;

  if (status === 401) {
    /** 토큰이 없으면 refresh 시도하지 않고 바로 intro로 이동 */
    const currentToken = tokenStorage.get();
    if (currentToken === null && window.location.pathname !== '/intro') {
      window.location.replace('/intro');
      throw new Error('토큰이 없습니다.');
    }
    try {
      const { data } = await axiosAuthInstance.post<{ data: { accessToken: string } }>(
        `/api/v1/auth/refresh/web`,
        null,
        {
          headers: {
            Authorization: `Bearer ${tokenStorage.get()}`,
          },
        },
      );
      if (!originRequest.headers) {
        originRequest.headers = {};
      }
      originRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
      tokenStorage.set(data.data.accessToken);

      return axiosInstance(originRequest);
    } catch (error) {
      console.error(error);
      tokenStorage.remove();

      /** intro 페이지에서 토큰 무효 시 무한 재로드를 막기 위함 */
      if (window.location.pathname !== '/intro') {
        window.location.replace('/intro');
      }
      throw new Error('토큰 갱신에 실패하였습니다.');
    }
  }

  return Promise.reject(error);
};
