import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const postPostHit = createEndpoint({
  request: (postIdList: string[]) => ({
    method: 'POST',
    url: `api/v1/community/posts/hit`,
    data: {
      postIdList: postIdList.map((id) => Number(id)).filter((value) => !Number.isNaN(value)),
    },
  }),
  serverResponseScheme: z.unknown(),
});
