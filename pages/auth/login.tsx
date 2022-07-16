import { useFacebookAuth } from '@/components/auth/idp/facebook';
import Link from 'next/link';
import { FC } from 'react';

const LoginPage: FC = () => {
  const facebookAuth = useFacebookAuth();

  return (
    <div>
      <button onClick={facebookAuth.login}>Login with Facebook</button>
      <Link href='/auth/verify'>회원가입</Link>
    </div>
  );
};

export default LoginPage;
