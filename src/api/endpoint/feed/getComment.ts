import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

// 재귀 스키마 정의
export const baseCommentSchema = z.object({
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
          companyName: z.string(),
          title: z.string(),
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
});

type commentSchema = z.infer<typeof baseCommentSchema> & {
  replies: commentSchema[];
};

export const recursiveCommentSchema: z.ZodType<commentSchema> = baseCommentSchema.extend({
  replies: z.lazy(() => recursiveCommentSchema.array()),
});

export const getComment = createEndpoint({
  request: (postId: string) => ({
    method: 'GET',
    url: `/api/v1/community/${postId}/comment`,
  }),
  serverResponseScheme: z.array(recursiveCommentSchema),
});

export const useGetCommentQuery = (postId: string) => {
  return useQuery({
    queryKey: getComment.cacheKey(postId),
    queryFn: () => getComment.request(postId),
  });
};
