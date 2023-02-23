import { useRouter } from 'next/router';
import { FC } from 'react';

import OAuthLoginCallback, { ProcessParamFn } from '@/components/auth/callback/OAuthLoginCallback';
import useFacebookAuth from '@/components/auth/identityProvider/useFacebookAuth';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';

const FacebookLoginCallbackPage: FC = () => {
  const router = useRouter();
  const facebookAuth = useFacebookAuth();
  const lastUnauthorized = useLastUnauthorized();

  const processParam: ProcessParamFn = async (url) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code || !state) {
      return {
        success: false,
        error: 'invalidURL',
      };
    }

    return await facebookAuth.sendLoginRequest(code, state);
  };

  const handleSuccess = () => {
    router.replace(lastUnauthorized.popPath() ?? '/');
  };

  return <OAuthLoginCallback processParam={processParam} onSuccess={handleSuccess} />;
};

export default FacebookLoginCallbackPage;
