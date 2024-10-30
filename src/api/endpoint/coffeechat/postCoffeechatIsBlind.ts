import { createEndpoint } from '@/api/typedAxios';
import { z } from 'zod';

export const changeIsBlindCoffeechat = createEndpoint({
  request: (open: boolean) => ({
    method: 'POST',
    url: 'api/v1/members/coffeechat/open',
    data: { open: open },
  }),
  serverResponseScheme: z.unknown(),
});
