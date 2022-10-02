import { removeAccessToken } from '@/components/auth/accessToken';
import { useRouter } from 'next/router';

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
