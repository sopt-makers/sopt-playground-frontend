import { useRouter } from 'next/router';
import { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import OAuthLoginCallback, { ProcessParamFn } from '@/components/auth/callback/OAuthLoginCallback';
import useFacebookAuth from '@/components/auth/identityProvider/facebook/useFacebookAuth';
import { lastLoginMethodAtom } from '@/components/auth/states/lastLoginMethodAtom';
import { registerTokenAtom } from '@/components/auth/states/registerTokenAtom';
import { playgroundLink } from '@/constants/links';

const FacebookRegisterCallbackPage: FC = () => {
  const router = useRouter();
  const registerToken = useRecoilValue(registerTokenAtom);
  const setLastLoginMethod = useSetRecoilState(lastLoginMethodAtom);
  const facebookAuth = useFacebookAuth();

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
    setLastLoginMethod('facebook');
    router.replace(playgroundLink.memberUpload());
  };

  return <OAuthLoginCallback oauthKey='facebookRegister' processParam={processParam} onSuccess={handleSuccess} />;
};

export default FacebookRegisterCallbackPage;
