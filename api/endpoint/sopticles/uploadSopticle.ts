import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const uploadSopticle = createEndpoint({
  request: (link: string, writerIds: number[]) => ({
    method: 'POST',
    url: `api/v1/sopticles`,
    data: {
      link,
      writerIds,
    },
  }),
  serverResponseScheme: z.unknown(),
});
