import { useRouter } from 'next/router';
import { FC } from 'react';

import OAuthLoginCallback, { ProcessParamFn } from '@/components/auth/callback/OAuthLoginCallback';
import useGoogleAuth from '@/components/auth/identityProvider/google/useGoogleAuth';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';

const GoogleLoginCallbackPage: FC = () => {
  const router = useRouter();
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

    return await googleAuth.sendLoginRequest(code, state);
  };

  const handleSuccess = () => {
    router.replace(lastUnauthorized.popPath() ?? '/');
  };

  return <OAuthLoginCallback processParam={processParam} onSuccess={handleSuccess} />;
};

export default GoogleLoginCallbackPage;
