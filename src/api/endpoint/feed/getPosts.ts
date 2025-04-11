import { useInfiniteQuery } from '@tanstack/react-query';
import { QS } from '@toss/utils';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

interface Params {
  categoryId?: string;
  limit?: number;
  cursor?: number | null;
}

const PostsSchema = z.object({
  categoryId: z.number().nullable(),
  hasNext: z.boolean(),
  posts: z.array(
    z.object({
      id: z.number(),
      member: z
        .object({
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
        })
        .nullable(),
      writerId: z.number().nullable(),
      isMine: z.boolean(),
      categoryId: z.number(),
      categoryName: z.string(),
      title: z.string(),
      content: z.string(),
      hits: z.number(),
      commentCount: z.number(),
      images: z.array(z.string()),
      isQuestion: z.boolean(),
      isBlindWriter: z.boolean(),
      sopticleUrl: z.string().nullable(),
      anonymousProfile: z
        .object({
          nickname: z.string(),
          profileImgUrl: z.string(),
        })
        .nullable(),
      createdAt: z.string().nullable(),
      isLiked: z.boolean(),
      likes: z.number(),
      comments: z.array(
        z.object({
          id: z.number(),
          member: z
            .object({
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
            })
            .nullable(),
          isMine: z.boolean(),
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
});

export type PostsType = z.infer<typeof PostsSchema>;

export const getPosts = createEndpoint({
  request: (params: Params = {}) => ({
    method: 'GET',
    url: `api/v1/community/posts${QS.create(params)}`,
  }),
  serverResponseScheme: PostsSchema,
});

export const useGetPostsInfiniteQuery = ({ categoryId }: { categoryId?: string } = {}) => {
  return useInfiniteQuery({
    queryKey: useGetPostsInfiniteQuery.getKey(categoryId),
    queryFn: async ({ pageParam }) => {
      return await getPosts.request({ limit: 30, categoryId, cursor: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.posts[lastPage.posts.length - 1].id : null;
    },
  });
};

useGetPostsInfiniteQuery.getKey = (categoryId: string | undefined) => [
  'INFINITE',
  ...getPosts.cacheKey({ limit: 0, cursor: 0, categoryId }),
];
