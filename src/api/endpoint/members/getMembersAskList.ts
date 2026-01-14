import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getMembersAskList = createEndpoint({
  request: (part: string) => ({
    method: 'GET',
    url: 'api/v1/members/ask/list',
    params: { part },
  }),
  serverResponseScheme: z.object({
    members: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        profileImageUrl: z.string().optional(),
        latestActivity: z.object({
          generation: z.number(),
          part: z.string(),
          team: z.string().nullable(),
        }),
        career: z
          .object({
            companyName: z.string(),
            title: z.string(),
          })
          .nullable(),

        isAnswerGuaranteed: z.boolean(),
      }),
    ),
  }),
});

export const useGetMembersAskList = (part: string) => {
  return useQuery({
    queryKey: ['getMembersAskList', part],
    queryFn: () => getMembersAskList.request(part),
    enabled: !!part,
  });
};
