import { axiosInstance } from '@/api';

// 토큰으로 자기 자신 확인
export const postRegistrationInfo = async (registerToken: string) => {
  const { data } = await axiosInstance.post<{ name: string; generation: number }>('api/v1/registration/info', {
    registerToken,
  });

  return data;
};

// email 발송
export const postRegistrationEmail = async (email: string) => {
  const { data } = await axiosInstance.post<{ success: boolean; code: string; message: string }>(
    'api/v1/registration/email',
    {
      email,
    },
  );

  return data;
};

// facebook register
export const postFacebookRegistration = async ({ code, registerToken }: { code: string; registerToken: string }) => {
  const { data } = await axiosInstance.post<{ accessToken: string }>(`api/v1/idp/facebook/register`, {
    code,
    registerToken,
  });

  return data;
};

// facebook auth
export const postFacebookAuth = async ({ code }: { code: string }) => {
  const { data } = await axiosInstance.post<{ accessToken: string }>(`api/v1/idp/facebook/auth`, {
    code,
  });

  return data;
};

export const postGoogleRegistration = async ({ code, registerToken }: { code: string; registerToken: string }) => {
  const { data } = await axiosInstance.post<{ accessToken: string }>(`api/v1/idp/google/register`, {
    code,
    registerToken,
  });

  return data;
};

export const postGoogleAuth = async ({ code }: { code: string }) => {
  const { data } = await axiosInstance.post<{ accessToken: string }>(`api/v1/idp/google/auth`, {
    code,
  });

  return data;
};

export const postSSOCode = async ({ accessToken }: { accessToken: string }) => {
  const { data } = await axiosInstance.post<{ accessToken: string }>(`api/v1/idp/sso/code`, {
    accessToken,
  });

  return {
    code: data.accessToken,
  };
};
