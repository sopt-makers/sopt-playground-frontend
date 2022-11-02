import axios from 'axios';

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

const authClient = axios.create({
  baseURL: AUTH_API_URL,
});

// 토큰으로 자기 자신 확인
export const postRegistrationInfo = async (registerToken: string) => {
  const { data } = await authClient.post<{ name: string; generation: number }>('api/v1/registration/info', {
    registerToken,
  });

  return data;
};

// email 발송
export const postRegistrationEmail = async (email: string) => {
  const { data } = await authClient.post<{ success: boolean; code: string; message: string }>(
    'api/v1/registration/email',
    {
      email,
    },
  );

  return data;
};

// facebook register
export const postFacebookRegistration = async ({ code, registerToken }: { code: string; registerToken: string }) => {
  const { data } = await authClient.post<{ accessToken: string }>(`api/v1/idp/facebook/register`, {
    code,
    registerToken,
  });

  return data;
};

// facebook auth
export const postFacebookAuth = async ({ code }: { code: string }) => {
  const { data } = await authClient.post<{ accessToken: string }>(`api/v1/idp/facebook/auth`, {
    code,
  });

  return data;
};
