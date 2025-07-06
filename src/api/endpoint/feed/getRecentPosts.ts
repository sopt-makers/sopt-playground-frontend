import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const recentPostsSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  likeCount: z.number(),
  commentCount: z.number(),
  isAnswered: z.boolean(),
  categoryId: z.number(),
  categoryName: z.string(),
  totalVoteCount: z.number().nullable(),
});

export type RecentPosts = z.infer<typeof recentPostsSchema>;

export const getRecentPosts = createEndpoint({
  request: {
    method: 'GET',
    url: '/api/v1/community/posts/all/recent',
  },
  serverResponseScheme: z.array(recentPostsSchema),
});

export const useRecentPosts = () =>
  useQuery({
    queryKey: getRecentPosts.cacheKey(),
    queryFn: () => getRecentPosts.request(),
  });
