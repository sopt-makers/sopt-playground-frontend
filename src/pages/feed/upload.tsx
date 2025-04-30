import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { uploadFeed } from '@/api/endpoint/feed/uploadFeed';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import FeedUploadPage, { LoadingWrapper } from '@/components/feed/page/FeedUploadPage';
import { PostedFeedDataType } from '@/components/feed/upload/types';
import { setLayout } from '@/utils/layout';

const FeedUpload: FC = () => {
  const router = useRouter();
  const { logSubmitEvent } = useEventLogger();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (reqeustBody: { data: PostedFeedDataType; id: number | null }) =>
      uploadFeed.request({ ...reqeustBody.data }),
  });

  const handlUploadSubmit = ({ data, id }: { data: PostedFeedDataType; id: number | null }) => {
    mutate(
      { data: data, id: id },
      {
        onSuccess: async () => {
          logSubmitEvent('submitCommunity');
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
          link: null,
        }}
        onSubmit={handlUploadSubmit}
      />
    </AuthRequired>
  );
};

setLayout(FeedUpload, 'empty');

export default FeedUpload;
