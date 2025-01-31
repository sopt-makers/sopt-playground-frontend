import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const postCoffeechatReview = createEndpoint({
  request: (coffeeChatId: number, nickname: string, content: string) => ({
    method: 'POST',
    url: 'api/v1/members/coffeechat/review',
    data: { coffeeChatId: coffeeChatId, nickname: nickname, content: content },
  }),
  serverResponseScheme: z.unknown(),
});
