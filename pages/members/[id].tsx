import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import PageViewLogger from '@/components/eventLogger/PageViewLogger';
import MemberDetail from '@/components/members/detail/MemberDetail';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const UserPage: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);

  if (status === 'loading') {
    return null;
  }

  if (status === 'error') {
    return null;
  }

  if (status === 'success') {
    return (
      <AuthRequired>
        <PageViewLogger name='member' />
        <MemberDetail memberId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(UserPage, 'headerFooter');

export default UserPage;
