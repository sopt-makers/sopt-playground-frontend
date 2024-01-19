import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';

import { uploadFeed } from '@/api/endpoint/feed/uploadFeed';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import FeedUploadPage, { LoadingWrapper } from '@/components/feed/page/FeedUploadPage';
import { FeedDataType } from '@/components/feed/upload/types';
import { setLayout } from '@/utils/layout';

const FeedUpload: FC = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (reqeustBody: { data: FeedDataType; id: number | null }) => uploadFeed.request({ ...reqeustBody.data }),
  });

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
        onSubmit={mutate}
      />
    </AuthRequired>
  );
};

setLayout(FeedUpload, 'empty');

export default FeedUpload;
