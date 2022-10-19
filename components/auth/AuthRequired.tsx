import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';

interface AuthRequiredProps {
  children: ReactNode;
}

/**
 * 로그인이 되어있지 않은 경우, 로그인 화면으로 이동합니다.
 */
const AuthRequired: FC<AuthRequiredProps> = ({ children }) => {
  const router = useRouter();

  const accessToken = useRecoilValue(accessTokenAtom);

  useEffect(() => {
    if (accessToken === null) {
      router.replace('/auth/login');
    }
  }, [router, accessToken]);

  return <>{children}</>;
};

export default AuthRequired;
