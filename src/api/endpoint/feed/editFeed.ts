import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { EditFeedDataType, FeedDataType } from '@/components/feed/upload/types';

export const editFeed = createEndpoint({
  request: (requestBody: EditFeedDataType) => ({
    method: 'PUT',
    url: 'api/v1/community/posts',
    data: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const useSaveEditFeedData = () => {
  return useMutation({
    mutationFn: (requestBody: { data: FeedDataType; id: number | null }) =>
      editFeed.request({ postId: requestBody.id, ...requestBody.data }),
  });
};
