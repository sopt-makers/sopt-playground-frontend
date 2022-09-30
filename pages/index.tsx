import AuthRequired from '@/components/auth/AuthRequired';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return <AuthRequired>Home</AuthRequired>;
};

export default Home;
