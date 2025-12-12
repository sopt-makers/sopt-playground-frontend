import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getMyWorkPreference = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/members/work-preference',
  },
  serverResponseScheme: z.object({
    workPreference: z.object({
      ideationStyle: z.union([z.literal('즉흥'), z.literal('숙고')]),
      workTime: z.union([z.literal('아침'), z.literal('밤')]),
      communicationStyle: z.union([z.literal('몰아서'), z.literal('나눠서')]),
      workPlace: z.union([z.literal('카공'), z.literal('집콕')]),
      feedbackStyle: z.union([z.literal('직설적'), z.literal('돌려서')]),
    }),
  }),
});

export const useGetMyWorkPreference = () => {
  return useQuery({
    queryKey: ['getMyWorkPreference'],
    queryFn: () => getMyWorkPreference.request(),
  });
};
