import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';

import { editFeed } from '@/api/endpoint/feed/editFeed';
import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import FeedUploadPage, { LoadingWrapper } from '@/components/feed/page/FeedUploadPage';
import { FeedDataType } from '@/components/feed/upload/types';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const FeedEdit: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);
  const { data } = useGetPostQuery(query?.id);

  const { mutate, isPending } = useMutation({
    mutationFn: (requestBody: { data: FeedDataType; id: number | null }) =>
      editFeed.request({ postId: requestBody.id, ...requestBody.data }),
  });

  if (isPending) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  if (status === 'loading') {
    return null;
  }

  if (status === 'error') {
    return null;
  }

  if (status === 'success') {
    return (
      <>
        {data != null && (
          <AuthRequired>
            <FeedUploadPage
              initialForm={{
                mainCategoryId: data.posts.categoryId,
                categoryId: data.posts.categoryId,
                title: data.posts.title,
                content: data.posts.content,
                isQuestion: data.posts.isQuestion,
                isBlindWriter: data.posts.isBlindWriter,
                images: data.posts.images,
              }}
              onSubmit={mutate}
              editingId={data.posts.id}
            />
          </AuthRequired>
        )}
      </>
    );
  }

  return null;
};

setLayout(FeedEdit, 'empty');

export default FeedEdit;
