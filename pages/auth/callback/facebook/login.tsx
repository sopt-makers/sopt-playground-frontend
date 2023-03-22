import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';

import OAuthLoginCallback, { ProcessParamFn } from '@/components/auth/callback/OAuthLoginCallback';
import useFacebookAuth from '@/components/auth/identityProvider/facebook/useFacebookAuth';
import { lastLoginMethodAtom } from '@/components/auth/states/lastLoginMethodAtom';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';

const FacebookLoginCallbackPage: FC = () => {
  const router = useRouter();
  const facebookAuth = useFacebookAuth();
  const setLastLoginMethod = useSetRecoilState(lastLoginMethodAtom);
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
    setLastLoginMethod('facebook');
    router.replace(lastUnauthorized.popPath() ?? '/');
  };

  return <OAuthLoginCallback oauthKey='facebookLogin' processParam={processParam} onSuccess={handleSuccess} />;
};

export default FacebookLoginCallbackPage;
