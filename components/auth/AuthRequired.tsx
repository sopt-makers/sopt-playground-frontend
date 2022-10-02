import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

import { getAccessToken } from '@/components/auth/accessToken';

interface AuthRequiredProps {
  children: ReactNode;
}

/**
 * 로그인이 되어있지 않은 경우, 로그인 화면으로 이동합니다.
 */
const AuthRequired: FC<AuthRequiredProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (getAccessToken() === null) {
      router.replace('/auth/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthRequired;
