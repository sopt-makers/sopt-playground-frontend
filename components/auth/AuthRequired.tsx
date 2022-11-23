import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { accessTokenAtom } from '@/atoms/accessTokenAtom';
import { profileDropdownAtom } from '@/atoms/profileDropdownAtom';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';

interface AuthRequiredProps {
  children: ReactNode;
}

/**
 * 로그인이 되어있지 않은 경우, 로그인 화면으로 이동합니다.
 */
const AuthRequired: FC<AuthRequiredProps> = ({ children }) => {
  const router = useRouter();

  const lastUnauthorized = useLastUnauthorized();
  const accessToken = useRecoilValue(accessTokenAtom);
  const setIsUserDropdownOpened = useSetRecoilState(profileDropdownAtom);

  useEffect(() => {
    if (router.isReady && accessToken === null) {
      lastUnauthorized.setPath(router.asPath);
      router.replace('/auth/login');
    }
  }, [router, router.isReady, accessToken, lastUnauthorized]);

  return <div onClick={() => setIsUserDropdownOpened(false)}>{children}</div>;
};

export default AuthRequired;
