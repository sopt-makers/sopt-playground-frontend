import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const uploadSopticle = createEndpoint({
  request: (url: string, writerIds: number[]) => ({
    method: 'POST',
    url: `api/v1/sopticles`,
    data: {
      url,
      writerIds,
    },
  }),
  serverResponseScheme: z.unknown(),
});
