import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const changeSMSCode = createEndpoint({
  request: (data: { phone: string }) => ({
    method: 'POST',
    url: '/api/v1/change/sms/code',
    data,
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
    code: z.string().nullable(),
    message: z.string().nullable(),
    registerToken: z.string().nullable(),
  }),
});
