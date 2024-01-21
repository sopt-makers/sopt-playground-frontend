import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { FeedDataType } from '@/components/feed/upload/types';

export const uploadFeed = createEndpoint({
  request: (reqeustBody: FeedDataType) => ({
    method: 'POST',
    url: 'api/v1/community/posts',
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});
