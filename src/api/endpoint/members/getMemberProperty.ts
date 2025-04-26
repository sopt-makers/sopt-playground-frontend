import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getMemberproperty = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/members/property',
  },
  serverResponseScheme: z.object({
    id: z.number(),
    major: z.string().nullable(),
    job: z.string().nullable(),
    organization: z.string().nullable(),
    part: z.array(z.string()),
    generation: z.array(z.number()),
    coffeeChatStatus: z.string(),
    receivedCoffeeChatCount: z.number(),
    sentCoffeeChatCount: z.number(),
  }),
});

/**
 * @desc Amplitude User Properties
 */
export const useGetMemberProperty = () => {
  return useQuery({
    queryKey: ['getMemberProperty'],
    queryFn: async () => {
      const data = await getMemberproperty.request();
      console.log(data);
      return data;
    },
  });
};
