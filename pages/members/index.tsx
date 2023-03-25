import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import StudyBanner from '@/components/common/Banner/StudyBanner';
import MemberList from '@/components/members/main/MemberList';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  return (
    <AuthRequired>
      <StudyBanner />
      <MemberList />
    </AuthRequired>
  );
};

setLayout(UserPage, 'headerFooter');

export default UserPage;
