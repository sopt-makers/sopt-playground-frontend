import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/members');
  }, [router]);

  return <AuthRequired>Home</AuthRequired>;
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
