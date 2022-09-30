import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { setAccessToken } from '@/components/auth/accessToken';
import useFacebookAuth from '@/components/auth/identityProvider/useFacebookAuth';
import useQueryStringParam from '@/components/auth/useQueryString';

const FacebookLoginCallbackPage: FC = () => {
  const router = useRouter();
  const facebookAuth = useFacebookAuth();

  const [message, setMessage] = useState('');

  useQueryStringParam(['code', 'state'], async ({ code, state }) => {
    const loginResult = await facebookAuth.sendLoginRequest(code, state);
    if (!loginResult.success) {
      setMessage('로그인에 오류가 발생했습니다.');
      return;
    }

    setAccessToken(loginResult.accessToken);
    router.replace('/');
  });

  return (
    <div>
      Processing...
      <br />
      {message}
    </div>
  );
};

export default FacebookLoginCallbackPage;
