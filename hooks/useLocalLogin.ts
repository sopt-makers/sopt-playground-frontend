import { useRouter } from 'next/router';

import { isLocal } from '@/constants/Config';

const SERVICE_ACCESS_TOKEN_KEY = 'serviceAccessToken';
const SERVICE_ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN ?? '';

const useLocalLogin = () => {
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
