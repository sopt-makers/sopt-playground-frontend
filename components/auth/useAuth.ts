import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';

const useAuth = () => {
  const router = useRouter();
  const resetAccessToken = useResetRecoilState(accessTokenAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  return {
    logout() {
      resetAccessToken();
      router.push('/auth/login');
    },
    isLoggedIn: !!accessToken,
  };
};

export default useAuth;
