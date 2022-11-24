import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import useAuth from '@/components/auth/useAuth';
import Header from '@/components/common/Header';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/members');
    }
  }, [isLoggedIn, router]);

  return <AuthRequired>{}</AuthRequired>;
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
