import { useRouter } from 'next/router';
import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import {  useRecoilValue } from 'recoil';

import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import { playgroundLink } from '@/constants/links';

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

  const isCalledRef = useRef(false);

  const runOnce = useCallback((fn: () => void) => {
    if (!isCalledRef.current) {
      fn();
      isCalledRef.current = true;
    } 
  }, []);


  useEffect(() => {
    if (router.isReady && accessToken === null) {
      runOnce(() => {
        lastUnauthorized.setPath(router.asPath);
        router.replace(playgroundLink.intro());
      });
    }
  }, [router, router.isReady, accessToken, lastUnauthorized, runOnce]);

  return <>{children}</>;
};

export default AuthRequired;
