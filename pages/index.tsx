import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useAuth from '@/components/auth/useAuth';
import Header from '@/components/common/Header';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/members');
    } else {
      router.replace('/auth/login');
    }
  }, [isLoggedIn, router]);

  return null;
};

setLayout(Home, (page) => {
  return (
    <>
      <Header />
      {page}
    </>
  );
});

export default Home;
