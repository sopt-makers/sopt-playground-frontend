import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC, useMemo } from 'react';

import { editFeed } from '@/api/endpoint/feed/editFeed';
import { getPost, useGetPostQuery } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { getRecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import AuthRequired from '@/components/auth/AuthRequired';
import Loading from '@/components/common/Loading';
import useModalState from '@/components/common/Modal/useModalState';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { getParentCategoryIdById } from '@/components/feed/common/utils';
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
          const parentId = getParentCategoryIdById(data.categoryId);

          const promises = [
            queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey(parentId?.toString()) }),
            queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey('') }),
            queryClient.invalidateQueries({ queryKey: getRecentPosts.cacheKey() }),
            editingId
              ? queryClient.invalidateQueries({ queryKey: getPost.cacheKey(`${editingId}`) })
              : Promise.resolve(),
          ];

          await Promise.all(promises);
          await router.push(playgroundLink.feedList());
        },
      },
    );
  };

  const voteForForm = useMemo(() => {
    if (!data) return null;

    const voteData = data.posts.vote;
    return voteData ? { isMultiple: voteData.isMultiple, voteOptions: voteData.options.map((o) => o.content) } : null;
  }, [data]);

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
                  link: data.posts.sopticleUrl,
                  vote: voteForForm,
                  mention: null,
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
