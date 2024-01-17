import { FC } from 'react';

import { useSaveEditFeedData } from '@/api/endpoint/feed/editFeed';
import { useGetPostQuery } from '@/api/endpoint/feed/getPost';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import FeedUploadPage, { LoadingWrapper } from '@/components/feed/page/FeedUploadPage';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const FeedEdit: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);
  const feedId = query ? query.id : '';
  const { data } = useGetPostQuery(feedId);

  const { mutate: handleEditFeed, isPending } = useSaveEditFeedData();

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
              onSubmit={handleEditFeed}
              editingId={data.posts.categoryId}
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
