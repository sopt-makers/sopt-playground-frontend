import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  return <AuthRequired>멤버 페이지</AuthRequired>;
};

setLayout(UserPage, (page) => (
  <>
    <Header />
    {page}
  </>
));

export default UserPage;
