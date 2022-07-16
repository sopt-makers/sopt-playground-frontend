import { useStringParam } from '@/components/auth/hooks';
import { useFacebookAuth } from '@/components/auth/idp/facebook';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

const FacebookLoginCallbackPage: FC = () => {
  const router = useRouter();
  const facebookAuth = useFacebookAuth();

  const [message, setMessage] = useState('');

  useStringParam(['code', 'state'], async ({ code, state }) => {
    const ret = await facebookAuth.sendLoginRequest(code, state);
    if (!ret.success) {
      setMessage('로그인에 오류가 발생했습니다.');
      return;
    }
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

export default FacebookLoginCallbackPage;
