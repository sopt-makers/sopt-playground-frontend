import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import FeedUploadPage from '@/components/feed/page/FeedUploadPage';
import { setLayout } from '@/utils/layout';

const CommunityUpload: FC = () => {
  return (
    <AuthRequired>
      <FeedUploadPage />
    </AuthRequired>
  );
};

setLayout(CommunityUpload, 'header');

export default CommunityUpload;
