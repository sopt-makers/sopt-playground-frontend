import { useInfiniteQuery } from '@tanstack/react-query';
import { QS } from '@toss/utils';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

interface Params {
  page?: number;
  take?: number;
}

const meetingsResponseScheme = z.array(
  z.object({
    id: z.number(),
    isMeetingLeader: z.boolean(),
    title: z.string(),
    imageUrl: z.string(),
    category: z.string().nullable(),
    isActiveMeeting: z.boolean(),
    mstartDate: z.string(),
    mendDate: z.string(),
  }),
);

export type MeetingsResponse = z.infer<typeof meetingsResponseScheme>;

// TODO: 내가 속한 모임 관련 추후 다시 플그 API 재사용으로 변경될 가능성 있음
// export const getMemberCrew = createEndpoint({
//   request: ({ params, id }: { params: Params; id: number }) => ({
//     method: 'GET',
//     url: `api/v1/members/crew/${id}/${QS.create(params)}`,
//   }),
//   serverResponseScheme: z.object({
//     meetings: meetingsResponseScheme,
//     meta: z.object({
//       page: z.number().nullable(),
//       take: z.number().nullable(),
//       itemCount: z.number().nullable(),
//       pageCount: z.number().nullable(),
//       hasPreviousPage: z.boolean().nullable(),
//       hasNextPage: z.boolean().nullable(),
//     }),
//   }),
// });

// export const useGetMemberCrewInfiniteQuery = (limit: number, id?: number) => {
//   if (typeof id === 'undefined') throw new Error('Invalid id');
//   return useInfiniteQuery({
//     queryKey: useGetMemberCrewInfiniteQuery.getKey(id),
//     queryFn: async ({ pageParam }) => {
//       return await getMemberCrew.request({ id: id, params: { page: pageParam, take: limit } });
//     },
//     initialPageParam: 1,
//     getNextPageParam: (lastPage) => {
//       return lastPage.meta.hasNextPage && lastPage.meta.page ? lastPage.meta.page + 1 : undefined;
//     },
//   });
// };

// useGetMemberCrewInfiniteQuery.getKey = (id: number) => [
//   'INFINITE',
//   ...getMemberCrew.cacheKey({ id: id, params: { page: 0, take: 0 } }),
// ];
