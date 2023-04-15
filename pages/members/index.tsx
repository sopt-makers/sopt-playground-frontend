import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import SOPTEventBanner from '@/components/common/Banner/SOPTEventBanner';
import MemberList from '@/components/members/main/MemberList';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  return (
    <AuthRequired>
      <SOPTEventBanner />
      <MemberList />
    </AuthRequired>
  );
};

setLayout(UserPage, 'headerFooter');

export default UserPage;
