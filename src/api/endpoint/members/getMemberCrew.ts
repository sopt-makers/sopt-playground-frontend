import { useInfiniteQuery } from '@tanstack/react-query';
import { QS } from '@toss/utils';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

interface Params {
  page: number;
  take: number;
}

export const getMemberCrew = createEndpoint({
  request: (params: Params) => ({
    method: 'GET',
    url: `api/v1/members/crew${QS.create(params)}`,
  }),
  serverResponseScheme: z.object({
    meetings: z.array(
      z.object({
        id: z.number(),
        isMeetingLeader: z.boolean(),
        title: z.string(),
        imageUrl: z.string().nullable(),
        category: z.string().nullable(),
        isActiveMeeting: z.boolean(),
        mstartDate: z.string(),
        mendDate: z.string(),
      }),
    ),
    meta: z.object({
      page: z.number().nullable(),
      take: z.number().nullable(),
      itemCount: z.number().nullable(),
      pageCount: z.number().nullable(),
      hasPreviousPage: z.boolean().nullable(),
      hasNextPage: z.boolean().nullable(),
    }),
  }),
});

export const useGetMemberCrewInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: useGetMemberCrewInfiniteQuery.getKey(),
    queryFn: async ({ pageParam }) => {
      return await getMemberCrew.request({ page: pageParam, take: 3 });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : null;
    },
  });
};

useGetMemberCrewInfiniteQuery.getKey = () => ['INFINITE', ...getMemberCrew.cacheKey({ page: 0, take: 0 })];
