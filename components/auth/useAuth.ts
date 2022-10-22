import { useRouter } from 'next/router';
import { useResetRecoilState } from 'recoil';

import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';

const useAuth = () => {
  const router = useRouter();
  const resetAccessToken = useResetRecoilState(accessTokenAtom);

  return {
    logout() {
      resetAccessToken();
      router.push('/auth/login');
    },
  };
};

export default useAuth;
