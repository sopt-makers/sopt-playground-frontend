import axios from 'axios';

import { postFacebookAuth, postFacebookRegistration } from '@/api/legacy/auth';
import useStateParam from '@/components/auth/util/useStateParam';
import { FACEBOOK_APP_ID, ORIGIN } from '@/constants/env';

const FACEBOOK_LOGIN_CALLBACK_URI = `${ORIGIN}/auth/callback/facebook/login`;
const FACEBOOK_REGISTER_CALLBACK_URI = `${ORIGIN}/auth/callback/facebook/register`;

interface FacebookAuth {
  login(): void;
  register(): void;
  sendLoginRequest(
    code: string,
    state: string,
  ): Promise<
    { success: true; accessToken: string } | { success: false; error: 'invalidNonce' | 'notMember' | 'unknown' }
  >;
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
        return { success: false, error: 'invalidNonce' };
      }

      try {
        const { accessToken } = await postFacebookAuth({ code });
        return {
          success: true,
          accessToken,
        };
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 403) {
            return {
              success: false,
              error: 'notMember',
            };
          }
        }
        return {
          success: false,
          error: 'unknown',
        };
      }
    },
    async sendRegisterRequest(code, registerToken, state) {
      if (state !== stateParam) {
        return { success: false };
      }

      try {
        const { accessToken } = await postFacebookRegistration({
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
