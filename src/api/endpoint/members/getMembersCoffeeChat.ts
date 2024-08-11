import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getMembersCoffeeChat = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/members/coffeechat',
  },
  serverResponseScheme: z.object({
    coffeeChatList: z.array(
      z.object({
        memberId: z.number().nullable(),
        name: z.string().nullable(),
        memberProfileImage: z.string().nullable(),
        organization: z.string().nullable(),
        careerTitle: z.string().nullable(),
        coffeeChatBio: z.string().nullable(),
      }),
    ),
    totalCount: z.number().nullable(),
  }),
});

export const useGetMembersCoffeeChat = () => {
  return useQuery({
    queryKey: ['getMembersCoffeeChat'],
    queryFn: () => getMembersCoffeeChat.request(),
  });
};
