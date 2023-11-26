import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const deletePost = createEndpoint({
  request: (postId: string) => ({
    method: 'DELETE',
    url: `api/v1/community/posts/${postId}`,
  }),
  serverResponseScheme: z.unknown(),
});

export const useDeletePostMutation = () => {
  return useMutation({
    mutationFn: (postId: string) => deletePost.request(postId),
  });
};
