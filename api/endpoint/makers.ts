import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getMakersProfile = createEndpoint({
  request: {
    method: 'GET',
    url: `makers/profile`,
  },
  serverResponse: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      profileImage: z.string().nullable(),
      activities: z.array(
        z.object({
          id: z.number(),
          generation: z.number(),
        }),
      ),
      careers: z.array(
        z.object({
          id: z.number(),
          companyName: z.string(),
          title: z.string(),
          isCurrent: z.boolean(),
        }),
      ),
    }),
  ),
});
