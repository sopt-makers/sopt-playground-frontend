import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getMembersCoffeeChat = createEndpoint({
  request: ({ query }: { query?: { [key: string]: string} }) => ({
    method: 'GET',
    url: 'api/v1/members/coffeechat',
    params: query, // 쿼리 파라미터 추가
  }),
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
        soptActivities:z.array(z.string()).nullable(),
        isBlind:z.boolean(),
        isMine:z.boolean()
      }),
    ),
  }),
});

export const useGetMembersCoffeeChat = (queryParams?: { [key: string]: string}) => {
  return useQuery({
    queryKey: ['getMembersCoffeeChat',queryParams],
    queryFn: () => getMembersCoffeeChat.request({query:queryParams}),
  });
};
