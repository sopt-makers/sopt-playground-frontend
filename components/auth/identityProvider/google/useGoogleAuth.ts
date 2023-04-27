import axios from 'axios';

import { postGoogleAuth, postGoogleRegistration } from '@/api/legacy/auth';
import useStateParam from '@/components/auth/util/useStateParam';
import { GOOGLE_OAUTH_CLIENT_ID, ORIGIN } from '@/constants/env';

const GOOGLE_LOGIN_CALLBACK_URI = `${ORIGIN}/auth/callback/google/login`;
const GOOGLE_REGISTER_CALLBACK_URI = `${ORIGIN}/auth/callback/google/register`;

interface GoogleAuth {
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
  isAvailable: boolean;
}

const useGoogleAuth = (): GoogleAuth => {
  const stateParam = useStateParam();

  return {
    isAvailable: GOOGLE_OAUTH_CLIENT_ID !== '',
    login() {
      open(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=openid&response_type=code&state=${stateParam}&redirect_uri=${encodeURIComponent(
          GOOGLE_LOGIN_CALLBACK_URI,
        )}&client_id=${GOOGLE_OAUTH_CLIENT_ID}`,
        '_parent',
      );
    },
    register() {
      open(
        `https://accounts.google.com/o/oauth2/v2/auth?scope=openid&response_type=code&state=${stateParam}&redirect_uri=${encodeURIComponent(
          GOOGLE_REGISTER_CALLBACK_URI,
        )}&client_id=${GOOGLE_OAUTH_CLIENT_ID}`,
        '_parent',
      );
    },
    async sendLoginRequest(code, state) {
      if (state !== stateParam) {
        return { success: false, error: 'invalidNonce' };
      }

      try {
        const { accessToken } = await postGoogleAuth({ code });
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
        const { accessToken } = await postGoogleRegistration({
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

export default useGoogleAuth;
