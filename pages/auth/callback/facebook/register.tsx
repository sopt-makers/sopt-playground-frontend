import { useRouter } from 'next/router';
import { FC } from 'react';

import OAuthLoginCallback, { ProcessParamFn } from '@/components/auth/callback/OAuthLoginCallback';
import useFacebookAuth from '@/components/auth/identityProvider/facebook/useFacebookAuth';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';

const FacebookRegisterCallbackPage: FC = () => {
  const router = useRouter();
  const facebookAuth = useFacebookAuth();
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
    const registerToken = localStorage.getItem('registerToken');

    if (!registerToken) {
      return {
        success: false,
        error: 'invalidURL',
      };
    }

    const res = await facebookAuth.sendRegisterRequest(code, registerToken, state);

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

export default FacebookRegisterCallbackPage;
