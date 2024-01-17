import { FC } from 'react';

import { useSaveUploadFeedData } from '@/api/endpoint/feed/uploadFeed';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import FeedUploadPage, { LoadingWrapper } from '@/components/feed/page/FeedUploadPage';
import { setLayout } from '@/utils/layout';

const FeedUpload: FC = () => {
  const { mutate: handleUploadFeed, isPending } = useSaveUploadFeedData();

  if (isPending) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  return (
    <AuthRequired>
      <FeedUploadPage
        initialForm={{
          mainCategoryId: null,
          categoryId: null,
          title: '',
          content: '',
          isQuestion: false,
          isBlindWriter: false,
          images: [],
        }}
        onSubmit={handleUploadFeed}
      />
    </AuthRequired>
  );
};

setLayout(FeedUpload, 'empty');

export default FeedUpload;
