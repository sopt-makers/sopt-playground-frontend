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

export const auth = {
  getRegisterTokenInfo,
  sendVerificationEmail,
};
