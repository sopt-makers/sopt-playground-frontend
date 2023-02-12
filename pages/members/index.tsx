import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import RecruitingBanner from '@/components/common/Banner/RecruitingBanner';
import MemberList from '@/components/members/main/MemberList';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  return (
    <AuthRequired>
      <RecruitingBanner />
      <MemberList />
    </AuthRequired>
  );
};

setLayout(UserPage, 'headerFooter');

export default UserPage;
