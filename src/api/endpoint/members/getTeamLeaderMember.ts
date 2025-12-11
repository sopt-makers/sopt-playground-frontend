import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getTLMembers = createEndpoint({
  request: () => ({
    method: 'GET',
    url: 'api/v1/members/tl',
  }),
  serverResponseScheme: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      university: z.string().nullable(),
      profileImage: z
        .string()
        .nullable()
        .transform((str) => str ?? ''),
      activities: z.array(
        z.object({
          id: z.number(),
          generation: z.number(),
          part: z.string(),
          team: z.string().nullable(),
        }),
      ),
      introduction: z.string().nullable(),
      serviceType: z.enum(['WEB', 'APP']).optional(),
    }),
  ),
});

/**
 * @desc TL 멤버 조회
 */
export const useGetTLMember = () => {
  return useQuery({
    queryKey: ['getTLMember'],
    queryFn: async () => {
      const data = await getTLMembers.request();
      return data;
    },
  });
};
