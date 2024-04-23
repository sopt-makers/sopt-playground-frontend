import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { usePostLikeMutation, usePostUnlikeMutation } from '@/api/endpoint/feed/postLike';

interface HandleToggleLikeParams {
  postId: number;
  isLiked: boolean;
  allPostsQueryKey: (string | Params | undefined)[];
  postsQueryKey: (string | Params | undefined)[];
  postQueryKey: string[];
}

export const useToggleLike = () => {
  const { mutate: likeMutate } = usePostLikeMutation();
  const { mutate: unLikeMutate } = usePostUnlikeMutation();

  const handleToggleLike = async ({
    postId,
    isLiked,
    allPostsQueryKey,
    postsQueryKey,
    postQueryKey,
  }: HandleToggleLikeParams) => {
    const mutationParams = { postId, allPostsQueryKey, postsQueryKey, postQueryKey };
    if (isLiked) {
      unLikeMutate(mutationParams);
    } else {
      likeMutate(mutationParams);
    }
  };
  return { handleToggleLike };
};
