import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import useFacebookAuth from '@/components/auth/identityProvider/useFacebookAuth';
import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import useQueryStringParam from '@/components/auth/useQueryString';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import { playgroundLink } from '@/constants/links';

const FacebookRegisterCallbackPage: FC = () => {
  const router = useRouter();
  const facebookAuth = useFacebookAuth();
  const lastUnauthorized = useLastUnauthorized();
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const [message, setMessage] = useState('');

  useQueryStringParam(['code', 'state'] as const, async ({ code, state }) => {
    const registerToken = localStorage.getItem('registerToken') ?? '';
    const registerResult = await facebookAuth.sendRegisterRequest(code, registerToken, state);

    if (!registerResult.success) {
      setMessage('회원가입에 오류가 발생했습니다.');
      return;
    }

    setAccessToken(registerResult.accessToken);
    router.replace(lastUnauthorized.popPath() ?? playgroundLink.memberUpload());
  });

  return (
    <div>
      Processing...
      <br />
      {message}
    </div>
  );
};

export default FacebookRegisterCallbackPage;
