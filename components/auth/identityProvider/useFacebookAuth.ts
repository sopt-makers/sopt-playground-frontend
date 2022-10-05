import { auth } from '@/api/auth';
import useStateParam from '@/components/auth/useStateParam';

const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN;
const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? '';

const FACEBOOK_LOGIN_CALLBACK_URI = `${ORIGIN}/auth/callback/facebook/login`;
const FACEBOOK_REGISTER_CALLBACK_URI = `${ORIGIN}/auth/callback/facebook/register`;

interface FacebookAuth {
  login(): void;
  register(): void;
  sendLoginRequest(code: string, state: string): Promise<{ success: true; accessToken: string } | { success: false }>;
  sendRegisterRequest(
    code: string,
    registerToken: string,
    state: string,
  ): Promise<{ success: true; accessToken: string } | { success: false }>;
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
        const { accessToken } = await auth.sendLoginRequest('facebook', { code });
        return {
          success: true,
          accessToken,
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
        const { accessToken } = await auth.sendRegisterRequest('facebook', {
          code,
          registerToken,
        });

        return {
          success: true,
          accessToken,
        };
      } catch {
        return {
          success: false,
        };
      }
    },
  };
};

export default useFacebookAuth;
