import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import HeaderLayout from '@/components/layout/HeaderLayout';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // MEMO: playground mainpage가 추가되기 전까진 멤버페이지로 redirect 시킵니다.
    router.push('/members');
  }, [router]);

  return <AuthRequired>{}</AuthRequired>;
};

setLayout(Home, HeaderLayout);

export default Home;
