import axios from 'axios';

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

const authClient = axios.create({
  baseURL: AUTH_API_URL,
});

async function getRegisterTokenInfo(registerToken: string) {
  return authClient.post<{ name: string; generation: number }>('api/v1/register/checkToken', {
    registerToken,
  });
}

async function sendVerificationEmail(email: string) {
  return authClient.post('api/v1/register/sendEmail', {
    email,
  });
}

type IDPTypes = 'facebook';

interface LoginRequestResponse {
  accessToken: string;
}

async function sendLoginRequest(idpName: IDPTypes, data: { code: string }): Promise<LoginRequestResponse> {
  const { code } = data;

  const res = await authClient.post(`api/v1/idp/${idpName}/auth`, { code });

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

  const res = await authClient.post(`api/v1/idp/${idpName}/register`, {
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
