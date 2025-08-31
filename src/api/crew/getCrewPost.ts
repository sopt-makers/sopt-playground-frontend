import { useQuery } from '@tanstack/react-query';

import { axiosCrewInstance } from '@/api';
import CrewQueryKey from '@/api/crew/CrewQueryKey';

const getCrewPost = async (postId: number) => {
  const response = await axiosCrewInstance.get(`/post/v2/${postId}`);
  return response.data;
};

export const useGetCrewPostQuery = (postId: number) => {
  return useQuery({
    queryKey: CrewQueryKey.post(postId),
    queryFn: () => getCrewPost(postId),
  });
};
