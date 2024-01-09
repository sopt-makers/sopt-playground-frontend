import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import FeedUploadPage from '@/components/feed/page/FeedUploadPage';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const FeedEdit: FC = () => {
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
        <FeedUploadPage isEdit feedId={query.id} />
      </AuthRequired>
    );
  }

  return null;
};

setLayout(FeedEdit, 'empty');

export default FeedEdit;
