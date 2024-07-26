import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { useInfiniteQuery } from '@tanstack/react-query';

const ReviewSchema = z.object({
  reviews: z.array(
    z.object({
      id: z.number(),
      content: z.string(),
    }),
  ),
  hasNext: z.boolean(),
});

export const getReviews = createEndpoint({
  request: ({ page, size }: { page: number; size: number }) => ({
    method: 'GET',
    url: `api/v1/review?page=${page}&size=${size}`,
  }),
  serverResponseScheme: ReviewSchema,
});

const SIZE = 20;

export const useGetReviewsInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: useGetReviewsInfiniteQuery.getKey(),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getReviews.request({ page: pageParam, size: SIZE });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasNext) {
        return undefined;
      }

      return pages.length;
    },
  });
};

useGetReviewsInfiniteQuery.getKey = () => ['INFINITE', ...getReviews.cacheKey({ page: 0, size: 0 })];
