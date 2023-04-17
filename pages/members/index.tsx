import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import MemberList from '@/components/members/main/MemberList';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  return (
    <AuthRequired>
      <MemberList />
    </AuthRequired>
  );
};

setLayout(UserPage, 'headerFooter');

export default UserPage;
