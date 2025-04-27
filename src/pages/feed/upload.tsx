import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { uploadFeed } from '@/api/endpoint/feed/uploadFeed';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { categoryIdNameMap } from '@/components/feed/common/utils';
import FeedUploadPage, { LoadingWrapper } from '@/components/feed/page/FeedUploadPage';
import { FeedDataType } from '@/components/feed/upload/types';
import { setLayout } from '@/utils/layout';

const FeedUpload: FC = () => {
  const router = useRouter();
  const { logSubmitEvent } = useEventLogger();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (reqeustBody: { data: FeedDataType; id: number | null }) => uploadFeed.request({ ...reqeustBody.data }),
  });

  const handlUploadSubmit = ({ data, id }: { data: FeedDataType; id: number | null }) => {
    mutate(
      { data: data, id: id },
      {
        onSuccess: async () => {
          const categoryName = data.categoryId !== null ? categoryIdNameMap[data.categoryId] : undefined;
          logSubmitEvent('submitCommunity', { category: categoryName });
          queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey('') });
          await router.push(playgroundLink.feedList());
        },
      },
    );
  };

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
        defaultValue={{
          categoryId: null,
          title: '',
          content: '',
          isQuestion: false,
          isBlindWriter: false,
          images: [],
        }}
        onSubmit={handlUploadSubmit}
      />
    </AuthRequired>
  );
};

setLayout(FeedUpload, 'empty');

export default FeedUpload;
