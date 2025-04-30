import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';

import { editFeed } from '@/api/endpoint/feed/editFeed';
import { getPost, useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import useModalState from '@/components/common/Modal/useModalState';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import EditImpossibleModal from '@/components/feed/edit/EditImpossibleModal';
import FeedUploadPage, { LoadingWrapper } from '@/components/feed/page/FeedUploadPage';
import { FeedDataType } from '@/components/feed/upload/types';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const FeedEdit: FC = () => {
  const { status, query } = useStringRouterQuery(['id'] as const);
  const { data } = useGetPostQuery(query?.id);
  const editingId = data?.posts.id;
  const router = useRouter();
  const { logSubmitEvent } = useEventLogger();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useModalState(true);

  const { mutate, isPending } = useMutation({
    mutationFn: (requestBody: { data: FeedDataType; id: number | null }) =>
      editFeed.request({ postId: requestBody.id, ...requestBody.data }),
  });

  const handleEditSubmit = ({ data, id }: { data: FeedDataType; id: number | null }) => {
    mutate(
      { data: data, id: id },
      {
        onSuccess: async () => {
          logSubmitEvent('editCommunity');
          queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey('') });
          editingId && queryClient.invalidateQueries({ queryKey: getPost.cacheKey(`${editingId}`) });
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
            {data.isMine ? (
              <FeedUploadPage
                defaultValue={{
                  categoryId: data.posts.categoryId,
                  title: data.posts.title,
                  content: data.posts.content,
                  isQuestion: data.posts.isQuestion,
                  isBlindWriter: data.posts.isBlindWriter,
                  images: data.posts.images,
                  sopticleUrl: data.posts.sopticleUrl,
                }}
                onSubmit={handleEditSubmit}
                editingId={data.posts.id}
              />
            ) : (
              <EditImpossibleModal isOpen={isOpen} onClose={onClose} />
            )}
          </AuthRequired>
        )}
      </>
    );
  }

  return null;
};

setLayout(FeedEdit, 'empty');

export default FeedEdit;
