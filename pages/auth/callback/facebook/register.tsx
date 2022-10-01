import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { setAccessToken } from '@/components/auth/accessToken';
import useFacebookAuth from '@/components/auth/identityProvider/useFacebookAuth';
import useQueryStringParam from '@/components/auth/useQueryString';

const FacebookRegisterCallbackPage: FC = () => {
  const router = useRouter();
  const facebookAuth = useFacebookAuth();

  const [message, setMessage] = useState('');

  useQueryStringParam(['code', 'state'] as const, async ({ code, state }) => {
    const registerToken = localStorage.getItem('registerToken') ?? '';
    const registerResult = await facebookAuth.sendRegisterRequest(code, registerToken, state);

    if (!registerResult.success) {
      setMessage('회원가입에 오류가 발생했습니다.');
      return;
    }

    setAccessToken(registerResult.accessToken);
    router.replace('/auth/register-finished');
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
