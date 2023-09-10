import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const appleChangeEndpoint = createEndpoint({
  request: (data: { code: string; registerToken: string }) => ({
    method: 'POST',
    url: '/api/v1/idp/apple/change',
    data,
  }),
  serverResponseScheme: z.object({
    accessToken: z.string(),
  }),
});
