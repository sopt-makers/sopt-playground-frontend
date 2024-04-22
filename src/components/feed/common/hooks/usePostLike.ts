import { usePostLikeMutation, usePostUnlikeMutation } from '@/api/endpoint/feed/postLike';

export const usePostLike = () => {
  const { mutate: likeMutate } = usePostLikeMutation();
  const { mutate: unLikeMutate } = usePostUnlikeMutation();

  const handlePostLike = async (postId: number, isLiked: boolean) => {
    console.log(isLiked);
    isLiked ? unLikeMutate(postId) : likeMutate(postId);
  };
  return { handlePostLike };
};
