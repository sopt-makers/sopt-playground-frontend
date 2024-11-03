import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';

export const editCoffeechat = createEndpoint({
  request: (requestBody: CoffeechatFormContent) => ({
    method: 'PUT',
    url: 'api/v1/members/coffeechat/details',
    data: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});
