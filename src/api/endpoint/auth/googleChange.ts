import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const googleChangeEndpoint = createEndpoint({
  request: (data: { code: string; registerToken: string }) => ({
    url: '/api/v1/idp/google/change',
    data,
  }),
  serverResponseScheme: z.object({
    accessToken: z.string(),
  }),
});
