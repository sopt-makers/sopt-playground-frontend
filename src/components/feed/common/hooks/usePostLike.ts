import { usePostLikeMutation } from '@/api/endpoint/feed/postLike';

export const usePostLike = () => {
  const { mutate } = usePostLikeMutation();

  const handlePostLike = async (postId: number) => {
    mutate(postId);
  };
  return { handlePostLike };
};
