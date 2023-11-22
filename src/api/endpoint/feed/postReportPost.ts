import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const postReportPost = createEndpoint({
  request: (postId: string) => ({
    method: 'POST',
    url: `api/v1/community/posts/${postId}/report`,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostReportPostMutation = () => {
  return useMutation({
    mutationFn: (postId: string) => postReportPost.request(postId),
  });
};
