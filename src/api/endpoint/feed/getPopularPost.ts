import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const PopularPostSchema = z.array(
  z.object({
    id: z.number(),
    category: z.string(),
    title: z.string(),
    member: z.object({
      id: z.number(),
      name: z.string(),
      profileImage: z.string().nullable(),
    }),
    hits: z.number(),
  }),
);

export const getPopularPost = createEndpoint({
  request: () => ({
    method: 'GET',
    url: `api/v1/community/posts/popular`,
  }),
  serverResponseScheme: PopularPostSchema,
});

export const useGetPopularPost = () => {
  return useQuery({
    queryKey: getPopularPost.cacheKey(),
    queryFn: () => getPopularPost.request(),
  });
};
