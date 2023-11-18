import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import { playgroundLink } from '@/constants/links';

const useAuth = () => {
  const router = useRouter();
  const resetAccessToken = useResetRecoilState(accessTokenAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  return {
    logout() {
      resetAccessToken();
      router.push(playgroundLink.intro());
    },
    isLoggedIn,
  };
};

export default useAuth;
