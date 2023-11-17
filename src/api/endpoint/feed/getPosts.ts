import { useQuery } from '@tanstack/react-query';
import { QS } from '@toss/utils';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

interface Params {
  categoryId?: number;
  limit?: number;
  cursor?: number;
}

export const getPosts = createEndpoint({
  request: (params: Params) => ({
    method: 'GET',
    url: `coummunity/posts${QS.create(params)}`,
  }),
  serverResponseScheme: z.object({
    categoryId: z.number(),
    hasNext: z.boolean(),
    posts: z.array(
      z.object({
        id: z.number(),
        member: z.object({
          id: z.number(),
          name: z.string(),
          profileImage: z.string().nullable(),
          activity: z.object({
            id: z.number(),
            memberId: z.number(),
            part: z.string(),
            generation: z.number(),
            team: z.string(),
          }),
          careers: z.object({
            id: z.number(),
            memberId: z.number(),
            companyName: z.string(),
            title: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            isCurrent: z.boolean(),
          }),
        }),
        writerId: z.number(),
        categoryId: z.number(),
        categoryName: z.string(),
        title: z.string(),
        content: z.string(),
        hits: z.number(),
        commentCount: z.number(),
        images: z.array(z.string()),
        isQuestion: z.boolean(),
        isBlindWriter: z.boolean(),
        createdAt: z.string(),
        comments: z.array(
          z.object({
            id: z.number(),
            member: z.object({
              id: z.number(),
              name: z.string(),
              profileImage: z.string().nullable(),
              activity: z.object({
                id: z.number(),
                memberId: z.number(),
                part: z.string(),
                generation: z.number(),
                team: z.string(),
              }),
              careers: z.object({
                id: z.number(),
                memberId: z.number(),
                companyName: z.string(),
                title: z.string(),
                startDate: z.string(),
                endDate: z.string(),
                isCurrent: z.boolean(),
              }),
            }),
            postId: z.number(),
            parentCommentId: z.number(),
            content: z.string(),
            isBlindWriter: z.boolean(),
            isReported: z.boolean(),
            createdAt: z.string(),
          }),
        ),
      }),
    ),
  }),
});

export const useGetPostsQuery = (params: Params) => {
  return useQuery({
    queryKey: getPosts.cacheKey(params),
    queryFn: async () => {
      const data = await getPosts.request(params);
      return data;
    },
  });
};
