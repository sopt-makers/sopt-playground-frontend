import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import MobileHeader from '@/components/common/MobileHeader';
import MemberDetail from '@/components/members/main/MemberDetail';
import MemberList from '@/components/members/main/MemberList';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);

  if (status === 'loading') {
    return null;
  }

  if (status === 'error') {
    return (
      <AuthRequired>
        <MemberList />
      </AuthRequired>
    );
  }

  if (status === 'success') {
    return (
      <AuthRequired>
        <MobileHeader />
        <MemberDetail memberId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(UserPage, 'headerFooter');

export default UserPage;
