import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getComment = createEndpoint({
  request: (postId: string) => ({
    method: 'GET',
    url: `/api/v1/community/${postId}/comment`,
  }),
  serverResponseScheme: z.array(
    z.object({
      id: z.number(),
      member: z
        .object({
          id: z.number(),
          name: z.string(),
          profileImage: z.string().nullable(),
          activity: z.object({
            part: z.string(),
            generation: z.number(),
            team: z.string().nullable(),
          }),
          careers: z
            .object({
              id: z.number(),
              memberId: z.number(),
              companyName: z.string(),
              title: z.string(),
              startDate: z.string(),
              endDate: z.string().nullable(),
              isCurrent: z.boolean(),
            })
            .nullable(),
        })
        .nullable(),
      postId: z.number(),
      parentCommentId: z.number().nullable(),
      content: z.string(),
      isBlindWriter: z.boolean(),
      anonymousProfile: z
        .object({
          nickname: z.string(),
          profileImgUrl: z.string(),
        })
        .nullable(),
      isReported: z.boolean(),
      isMine: z.boolean(),
      createdAt: z.string(),
    }),
  ),
});

export const useGetCommentQuery = (postId: string) => {
  return useQuery({
    queryKey: getComment.cacheKey(postId),
    queryFn: () => getComment.request(postId),
  });
};
