import { useRouter } from 'next/router';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import OAuthLoginCallback, { ProcessParamFn } from '@/components/auth/callback/OAuthLoginCallback';
import useGoogleAuth from '@/components/auth/identityProvider/google/useGoogleAuth';
import { registerTokenAtom } from '@/components/auth/states/registerTokenAtom';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';

const GoogleRegisterCallbackPage: FC = () => {
  const router = useRouter();
  const registerToken = useRecoilValue(registerTokenAtom);
  const googleAuth = useGoogleAuth();
  const lastUnauthorized = useLastUnauthorized();

  const processParam: ProcessParamFn = async (url) => {
    const params = new URLSearchParams(url.hash.slice(1));

    const code = params.get('code');
    const state = params.get('state');

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

    const res = await googleAuth.sendRegisterRequest(code, registerToken, state);

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
  };

  const handleSuccess = () => {
    router.replace(lastUnauthorized.popPath() ?? '/');
  };

  return <OAuthLoginCallback processParam={processParam} onSuccess={handleSuccess} />;
};

export default GoogleRegisterCallbackPage;
