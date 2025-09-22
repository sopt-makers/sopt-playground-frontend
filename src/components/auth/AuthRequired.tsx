import { useRouter } from 'next/router';
import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';

import { tokenStorage } from '@/components/auth/util/accessToken';
import useLastUnauthorized from '@/components/auth/util/useLastUnauthorized';
import { IS_DEV } from '@/constants/env';
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
  const accessToken = tokenStorage.get();

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
        router.replace(IS_DEV ? playgroundLink.intro() : playgroundLink.accounts());
      });
    }
  }, [router, router.isReady, accessToken, lastUnauthorized, runOnce]);

  return <>{children}</>;
};

export default AuthRequired;
