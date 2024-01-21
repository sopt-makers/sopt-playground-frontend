import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { EditFeedDataType } from '@/components/feed/upload/types';

export const editFeed = createEndpoint({
  request: (requestBody: EditFeedDataType) => ({
    method: 'PUT',
    url: 'api/v1/community/posts',
    data: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});
