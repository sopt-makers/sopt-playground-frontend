import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getMembersSearchByName = createEndpoint({
  request: (name: string) => ({
    method: 'GET',
    url: `api/v1/members/search?name=${encodeURIComponent(name)}`,
  }),
  serverResponse: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      generation: z.number(),
      hasProfile: z.boolean(),
      profileImage: z
        .string()
        .optional()
        .nullable()
        .transform((str) => str ?? ''),
    }),
  ),
});
