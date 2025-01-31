import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const CoffeechatReviewDetailSchema = z.object({
  coffeeChatReviewList: z.array(
    z.object({
      profileImage: z.string(),
      nickname: z.string(),
      soptActivities: z.array(z.string()),
      coffeeChatTopicType: z.array(z.string()),
      content: z.string(),
    }),
  ),
});

export const getRecentCoffeeChatReview = createEndpoint({
  request: () => ({
    method: 'GET',
    url: `api/v1/members/coffeechat/reviews`,
  }),

  serverResponseScheme: CoffeechatReviewDetailSchema,
});

export const useGetRecentCoffeeChatReview = () => {
  return useQuery({
    queryKey: getRecentCoffeeChatReview.cacheKey(),
    queryFn: () => getRecentCoffeeChatReview.request(),
  });
};
