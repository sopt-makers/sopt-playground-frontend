import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const changeSMSToken = createEndpoint({
  request: (data: { code: string }) => ({
    method: 'POST',
    url: '/api/v1/change/sms/token',
    data: {
      sixNumberCode: data.code,
    },
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
    message: z.string().nullable(),
    registerToken: z.string(),
  }),
});
