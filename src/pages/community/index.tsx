import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import CommunityPage from '@/components/feed/page/FeedHomePage';
import { setLayout } from '@/utils/layout';

const Community: FC = () => {
  return (
    <AuthRequired>
      <CommunityPage />
    </AuthRequired>
  );
};

setLayout(Community, 'header');

export default Community;
