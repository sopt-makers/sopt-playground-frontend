import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getWinners = createEndpoint({
  request: {
    method: 'GET',
    url: '/winners',
  },
  serverResponseScheme: z.array(
    z.object({
      gameNum: z.number(),
      user: z.object({
        userId: z.number(),
        profileImage: z.string(),
        userName: z.string(),
      }),
    }),
  ),
});
