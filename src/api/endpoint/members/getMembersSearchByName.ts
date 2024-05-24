import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getMembersSearchByName = createEndpoint({
  request: (cond: string) => ({
    method: 'GET',
    url: `api/v1/members/search?cond=${encodeURIComponent(cond)}`,
  }),
  serverResponseScheme: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      generation: z.number(),
      hasProfile: z.boolean(),
      profileImage: z
        .string()
        .nullable()
        .transform((str) => str ?? ''),
    }),
  ),
});
