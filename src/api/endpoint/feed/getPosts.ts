import { useInfiniteQuery } from '@tanstack/react-query';
import { QS } from '@toss/utils';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

interface Params {
  categoryId?: string;
  limit?: number;
  cursor?: number | null;
}

export const getPosts = createEndpoint({
  request: (params: Params = {}) => ({
    method: 'GET',
    url: `api/v1/community/posts${QS.create(params)}`,
  }),
  serverResponseScheme: z.object({
    categoryId: z.number().nullable(),
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
            team: z.string().nullable(),
          }),
          careers: z
            .object({
              id: z.number(),
              memberId: z.number(),
              companyName: z.string(),
              title: z.string(),
              startDate: z.string(),
              endDate: z.string(),
              isCurrent: z.boolean(),
            })
            .nullable(),
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
            }),
            postId: z.number(),
            parentCommentId: z.number().nullable(),
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

export const useGetPostsInfiniteQuery = ({ limit = 30, categoryId }: { limit?: number; categoryId?: string }) => {
  return useInfiniteQuery({
    queryKey: ['INFINITE', ...getPosts.cacheKey({ limit, cursor: 0, categoryId })],
    queryFn: async ({ pageParam }) => {
      return await getPosts.request({ limit, categoryId, cursor: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.posts[lastPage.posts.length - 1].id : null;
    },
  });
};
