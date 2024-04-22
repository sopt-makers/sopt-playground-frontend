import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { usePostLikeMutation, usePostUnlikeMutation } from '@/api/endpoint/feed/postLike';

export const useToggleLike = () => {
  const { mutate: likeMutate } = usePostLikeMutation();
  const { mutate: unLikeMutate } = usePostUnlikeMutation();

  const handleToggleLike = async (postId: number, isLiked: boolean, queryKey: (string | Params | undefined)[]) => {
    const mutationParams = { postId, queryKey };
    if (isLiked) {
      unLikeMutate(mutationParams);
    } else {
      likeMutate(mutationParams);
    }
  };
  return { handleToggleLike };
};
