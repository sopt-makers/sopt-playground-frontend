import { usePostLikeMutation, usePostUnlikeMutation } from '@/api/endpoint/feed/postLike';

export const useToggleLike = () => {
  const { mutate: likeMutate } = usePostLikeMutation();
  const { mutate: unLikeMutate } = usePostUnlikeMutation();

  const handleToggleLike = async (postId: number, isLiked: boolean) => {
    isLiked ? unLikeMutate(postId) : likeMutate(postId);
  };
  return { handleToggleLike };
};
