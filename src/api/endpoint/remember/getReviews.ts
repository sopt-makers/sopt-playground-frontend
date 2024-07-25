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
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getReviews.request({ page: pageParam, size: SIZE });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      return lastPage.hasNext ? lastPage.reviews[0].id : null;
    },
  });
};

useGetReviewsInfiniteQuery.getKey = () => ['infiniteReviews'];
