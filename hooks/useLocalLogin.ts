import Config from '@/constants/Config';
import { useRouter } from 'next/router';

const SERVICE_ACCESS_TOKEN_KEY = 'serviceAccessToken';
const SERVICE_ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? '';

const useLocalLogin = () => {
  const { isLocal } = Config;
  const router = useRouter();

  const onClickLocalLogin = () => {
    if (!localStorage.getItem(SERVICE_ACCESS_TOKEN_KEY)) {
      localStorage.setItem(SERVICE_ACCESS_TOKEN_KEY, SERVICE_ACCESS_TOKEN);
    }
    router.push('/');
  };

  return { isLocal, onClickLocalLogin };
};

export default useLocalLogin;
