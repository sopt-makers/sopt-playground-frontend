import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { getWordchainWinners } from '@/api/endpoint/wordchain/getWordchainWinners';

interface UseWordchainWinnersQueryVariables {
  limit: number;
  queryKey?: QueryKey;
}

export const useWordchainWinnersQuery = ({ limit, queryKey }: UseWordchainWinnersQueryVariables) => {
  const _queryKey = (typeof queryKey === 'string' ? [queryKey] : queryKey) ?? [];

  return useInfiniteQuery({
    queryKey: ['getWordchainWinners', limit, ..._queryKey],
    queryFn: async ({ pageParam: cursor = 0 }) => {
      const response = await getWordchainWinners.request({ limit, cursor });
      const page = { hasNext: response.hasNext, winners: response.winners };
      return page;
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasNext) {
        return undefined;
      }
      const totalPageNum = pages.length * limit;
      return totalPageNum;
    },
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });
};
