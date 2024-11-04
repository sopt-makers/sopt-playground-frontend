import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { CoffeechatFormContent } from '@/components/coffeechat/upload/CoffeechatForm/types';

export const uploadCoffeechat = createEndpoint({
  request: (reqeustBody: CoffeechatFormContent) => ({
    method: 'POST',
    url: 'api/v1/members/coffeechat/details',
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});
