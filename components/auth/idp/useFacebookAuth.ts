import { useStateParam } from '@/components/auth/stateParam';
import axios from 'axios';

const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? '';
const FACEBOOK_LOGIN_CALLBACK_URI = process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_CALLBACK_URI ?? '';
const FACEBOOK_REGISTER_CALLBACK_URI = process.env.NEXT_PUBLIC_FACEBOOK_REGISTER_CALLBACK_URI ?? '';
const FACEBOOK_LOGIN_CODE_ENDPOINT = process.env.NEXT_PUBLIC_FACEBOOK_LOGIN_CODE_ENDPOINT ?? '';
const FACEBOOK_REGISTER_CODE_ENDPOINT = process.env.NEXT_PUBLIC_FACEBOOK_REGISTER_CODE_ENDPOINT ?? '';

interface FacebookAuth {
  login(): void;
  register(): void;
  sendLoginRequest(
    code: string,
    state: string,
  ): Promise<{ success: boolean; accessToken: any } | { success: boolean; accessToken?: undefined }>;
  sendRegisterRequest(
    code: string,
    registerToken: string,
    state: string,
  ): Promise<{ success: boolean; accessToken: any } | { success: boolean; accessToken?: undefined }>;
}

const useFacebookAuth = (): FacebookAuth => {
  const stateParam = useStateParam();

  return {
    login() {
      open(
        `https://www.facebook.com/v13.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FACEBOOK_LOGIN_CALLBACK_URI}&state=${stateParam}`,
        '_parent',
      );
    },
    register() {
      open(
        `https://www.facebook.com/v13.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FACEBOOK_REGISTER_CALLBACK_URI}&state=${stateParam}`,
        '_parent',
      );
    },
    async sendLoginRequest(code, state) {
      if (state !== stateParam) {
        return { success: false };
      }

      try {
        const res = await axios.post(FACEBOOK_LOGIN_CODE_ENDPOINT, { code });
        return {
          success: true,
          accessToken: res.data.accessToken,
        };
      } catch {
        return {
          success: false,
        };
      }
    },
    async sendRegisterRequest(code, registerToken, state) {
      if (state !== stateParam) {
        return { success: false };
      }

      try {
        const res = await axios.post(FACEBOOK_REGISTER_CODE_ENDPOINT, {
          facebookAuthCode: code,
          registerToken,
        });

        return {
          success: true,
          accessToken: res.data.accessToken,
        };
      } catch (e) {
        return {
          success: false,
        };
      }
    },
  };
};

export default useFacebookAuth;
