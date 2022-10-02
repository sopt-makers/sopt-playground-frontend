import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import { setLayout } from '@/utils/layout';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return <AuthRequired>멤버 페이지</AuthRequired>;
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
