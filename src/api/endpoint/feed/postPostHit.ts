import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const postPostHit = createEndpoint({
  request: (postId: number) => ({
    method: 'POST',
    url: `community/posts/${postId}/hit`,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostPostHitMutation = (postId: number) => {
  return useMutation({
    mutationFn: async () => {
      const data = await postPostHit.request(postId);
      return data;
    },
  });
};
