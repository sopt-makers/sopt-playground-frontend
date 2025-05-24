import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { useToggleLikeMutation } from '@/api/endpoint/feed/postLike';

interface HandleToggleLikeParams {
  postId: number;
  isLiked: boolean;
  likes: number;
  allPostsQueryKey: (string | Params | undefined)[];
  postsQueryKey: (string | Params | undefined)[];
  postQueryKey: string[];
  waitingQuestionQuerykey: string[];
}

export const useToggleLike = () => {
  const { mutate } = useToggleLikeMutation();

  const handleToggleLike = async ({
    postId,
    isLiked,
    likes,
    allPostsQueryKey,
    postsQueryKey,
    postQueryKey,
    waitingQuestionQuerykey,
  }: HandleToggleLikeParams) => {
    const action: 'unlike' | 'like' = isLiked ? 'unlike' : 'like';
    const mutationParams = {
      postId,
      action,
      likes,
      allPostsQueryKey,
      postsQueryKey,
      postQueryKey,
      waitingQuestionQuerykey,
    };
    mutate(mutationParams);
  };
  return { handleToggleLike };
};
