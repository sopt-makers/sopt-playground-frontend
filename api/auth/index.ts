import { axiosInstance } from '@/api';

async function getRegisterTokenInfo(registerToken: string) {
  return axiosInstance.post<{ name: string; generation: number }>('api/v1/registration/info', {
    registerToken,
  });
}

async function sendVerificationEmail(email: string) {
  return axiosInstance.post('api/v1/registration/email', {
    email,
  });
}

type IDPTypes = 'facebook';

interface LoginRequestResponse {
  accessToken: string;
}

async function sendLoginRequest(idpName: IDPTypes, data: { code: string }): Promise<LoginRequestResponse> {
  const { code } = data;

  const res = await axiosInstance.post(`api/v1/idp/${idpName}/auth`, { code });

  return {
    accessToken: res.data.accessToken + '',
  };
}

interface RegisterRequestResponse {
  accessToken: string;
}

async function sendRegisterRequest(
  idpName: IDPTypes,
  data: { code: string; registerToken: string },
): Promise<RegisterRequestResponse> {
  const { code, registerToken } = data;

  const res = await axiosInstance.post(`api/v1/idp/${idpName}/register`, {
    code,
    registerToken,
  });

  return {
    accessToken: res.data.accessToken + '',
  };
}

export const auth = {
  getRegisterTokenInfo,
  sendVerificationEmail,
  sendLoginRequest,
  sendRegisterRequest,
};
