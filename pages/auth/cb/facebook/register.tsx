import { useStringParam } from '@/components/auth/hooks';
import useFacebookAuth from '@/components/auth/idp/useFacebookAuth';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

const FacebookRegisterCallbackPage: FC = () => {
  const router = useRouter();
  const facebookAuth = useFacebookAuth();

  const [message, setMessage] = useState('');

  useStringParam(['code', 'state'] as const, async ({ code, state }) => {
    const registerToken = localStorage.getItem('registerToken') ?? '';
    const ret = await facebookAuth.sendRegisterRequest(code, registerToken, state);

    if (!ret.success) {
      setMessage('회원가입에 오류가 발생했습니다.');
      return;
    }

    localStorage.setItem('accessToken', ret.accessToken);
    router.push('/');
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
