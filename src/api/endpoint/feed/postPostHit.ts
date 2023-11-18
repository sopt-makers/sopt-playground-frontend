import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const postPostHit = createEndpoint({
  request: (postId: string) => ({
    method: 'POST',
    url: `api/v1/community/posts/${postId}/hit`,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostPostHitMutation = (postId: string) => {
  return useMutation({
    mutationFn: () => postPostHit.request(postId),
  });
};
