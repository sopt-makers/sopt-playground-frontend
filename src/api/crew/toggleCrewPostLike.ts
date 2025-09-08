import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axiosCrewInstance } from '@/api';
import CrewQueryKey from '@/api/crew/CrewQueryKey';

const postCrewPostLike = async (orgId: number, postId: number) => {
  const response = await axiosCrewInstance.post('/internal/meeting/stats/likes', {
    orgId,
    postId,
  });
  return response.data;
};

export const useToggleCrewPostLikeMutation = (orgId: number, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postCrewPostLike(orgId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CrewQueryKey.post(orgId) });
    },
  });
};
