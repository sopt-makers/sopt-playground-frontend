import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const changeIsBlindCoffeechat = createEndpoint({
  request: (open: boolean) => ({
    method: 'PATCH',
    url: 'api/v1/members/coffeechat/open',
    data: { open: open },
  }),
  serverResponseScheme: z.unknown(),
});
