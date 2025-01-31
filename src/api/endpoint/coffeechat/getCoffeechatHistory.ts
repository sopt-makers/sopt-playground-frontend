import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const CoffeechatHistorySchema = z.object({
  coffeeChatHistories: z.array(
    z.object({
      id: z.number().nullable(),
      coffeeChatBio: z.string().nullable(),
      name: z.string().nullable(),
      career: z.string().nullable(),
      coffeeChatTopicType: z.array(z.string()).nullable(),
    }),
  ),
});

export const getCoffeechatHistory = createEndpoint({
  request: () => ({
    method: 'GET',
    url: `api/v1/members/coffeechat/history`,
  }),
  serverResponseScheme: CoffeechatHistorySchema,
});

export const useGetCoffeechatHistory = () => {
  return useQuery({
    queryKey: getCoffeechatHistory.cacheKey(),
    queryFn: () => getCoffeechatHistory.request(),
  });
};
