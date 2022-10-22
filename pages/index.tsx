import type { NextPage } from 'next';

import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
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
