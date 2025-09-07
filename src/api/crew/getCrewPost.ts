import { useInfiniteQuery } from '@tanstack/react-query';

import { axiosCrewInstance } from '@/api';
import CrewQueryKey from '@/api/crew/CrewQueryKey';

const getCrewPost = async (orgId: number, page: number, take: number) => {
  const response = await axiosCrewInstance.get(`/internal/post/${orgId}`, {
    params: {
      page,
      take,
    },
  });
  return response.data;
};

export const useGetCrewPostInfiniteQuery = (orgId: number) => {
  return useInfiniteQuery({
    queryKey: CrewQueryKey.post(orgId),
    queryFn: ({ pageParam }) => getCrewPost(orgId, pageParam, 30),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.pageMeta?.hasNextPage ? lastPage.pageMeta.page + 1 : undefined),
  });
};
