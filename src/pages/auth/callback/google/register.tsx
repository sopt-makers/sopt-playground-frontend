import { useRouter } from 'next/router';
import { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import OAuthLoginCallback, { ProcessParamFn } from '@/components/auth/callback/OAuthLoginCallback';
import useGoogleAuth from '@/components/auth/identityProvider/google/useGoogleAuth';
import { lastLoginMethodAtom } from '@/components/auth/states/lastLoginMethodAtom';
import { registerTokenAtom } from '@/components/auth/states/registerTokenAtom';
import { playgroundLink } from '@/constants/links';

const GoogleRegisterCallbackPage: FC = () => {
  const router = useRouter();
  const registerToken = useRecoilValue(registerTokenAtom);
  const setLastLoginMethod = useSetRecoilState(lastLoginMethodAtom);
  const googleAuth = useGoogleAuth();

  const processParam: ProcessParamFn = async (url) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code || !state) {
      return {
        success: false,
        error: 'invalidURL',
      };
    }

    if (!registerToken) {
      return {
        success: false,
        error: 'invalidURL',
      };
    }

    if (registerToken.type === 'register') {
      const res = await googleAuth.sendRegisterRequest(code, registerToken.value, state);

      if (res.success) {
        return {
          success: true,
          accessToken: res.accessToken,
        };
      }

      return {
        success: false,
        error: 'unknown',
      };
    } else if (registerToken.type === 'reset') {
      const res = await googleAuth.sendResetRequest(code, registerToken.value, state);

      if (res.success) {
        return {
          success: true,
          accessToken: res.accessToken,
        };
      }

      return {
        success: false,
        error: 'unknown',
      };
    }

    const _: never = registerToken.type;
    throw new Error('Should never reach here.');
  };

  const handleSuccess = () => {
    setLastLoginMethod('google');
    if (registerToken?.type === 'register') {
      router.replace(playgroundLink.memberUpload());
    } else if (registerToken?.type === 'reset') {
      router.replace('/');
    }
  };

  return <OAuthLoginCallback oauthKey='googleRegister' processParam={processParam} onSuccess={handleSuccess} />;
};

export default GoogleRegisterCallbackPage;
