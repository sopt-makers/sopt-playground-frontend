import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const uploadFeed = createEndpoint({
  request: (reqeustBody) => ({
    method: 'POST',
    url: 'review/upload',
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});
