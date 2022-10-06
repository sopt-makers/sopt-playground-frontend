import { useRouter } from 'next/router';

import { removeAccessToken } from '@/components/auth/accessToken';

const useAuth = () => {
  const router = useRouter();

  return {
    logout() {
      removeAccessToken();
      router.push('/auth/login');
    },
  };
};

export default useAuth;
