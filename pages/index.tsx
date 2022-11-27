import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenAtom);

  useEffect(() => {
    if (router.isReady && accessToken === null) {
      router.replace('/auth/login');
    } else {
      router.replace('/members');
    }
  }, [accessToken, router, router.isReady]);

  return null;
};

setLayout(Home, 'header');

export default Home;
