import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getRecentCoffeeChat = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/members/coffeechat/recent',
  },
  serverResponseScheme: z.object({
    coffeeChatList: z.array(
      z.object({
        memberId: z.number().nullable(),
        bio:z.string().nullable(),
        topicTypeList:z.array(z.string()).nullable(),
        profileImage:z.string().nullable(),
        name: z.string().nullable(),
        career:z.string().nullable(),
        organization: z.string().nullable(),
        companyJob:z.string().nullable(),
        soptActivities:z.array(z.string()).nullable()
      }),
    ),
  }),
});

export const useGetRecentCoffeeChat = () => {
  return useQuery({
    queryKey: ['getRecentCoffeeChat'],
    queryFn: () => getRecentCoffeeChat.request(),
  });
};
