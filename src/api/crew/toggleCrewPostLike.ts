import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosCrewInstance } from '@/api';
import CrewQueryKey from '@/api/crew/CrewQueryKey';

const postCrewPostLike = async (postId: number) => {
  const response = await axiosCrewInstance.post(`/post/v2/${postId}/like`);
  return response.data;
};

export const useToggleCrewPostLikeMutation = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postCrewPostLike(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CrewQueryKey.post(postId) });
    },
  });
};
