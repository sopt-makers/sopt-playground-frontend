import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';

import OAuthLoginCallback, { ProcessParamFn } from '@/components/auth/callback/OAuthLoginCallback';
import useAppleAuth from '@/components/auth/identityProvider/apple/useAppleAuth';
import { lastLoginMethodAtom } from '@/components/auth/states/lastLoginMethodAtom';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';

const AppleLoginCallbackPage: FC = () => {
  const router = useRouter();
  const appleAuth = useAppleAuth();
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

    return await appleAuth.sendLoginRequest(code, state);
  };

  const handleSuccess = () => {
    setLastLoginMethod('apple');
    router.replace(lastUnauthorized.popPath() ?? '/');
  };

  return <OAuthLoginCallback oauthKey='appleLogin' processParam={processParam} onSuccess={handleSuccess} />;
};

export default AppleLoginCallbackPage;
