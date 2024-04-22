import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const postLike = createEndpoint({
  request: (postId: number) => ({
    method: 'POST',
    url: `api/v1/community/posts/like/${postId}`,
  }),
  serverResponseScheme: z.unknown(),
});

export const postUnlike = createEndpoint({
  request: (postId: number) => ({
    method: 'DELETE',
    url: `api/v1/community/posts/unlike/${postId}`,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostLikeMutation = () => {
  return useMutation({
    mutationFn: (postId: number) => postLike.request(postId),
  });
};

export const usePostUnlikeMutation = () => {
  return useMutation({
    mutationFn: (postId: number) => postUnlike.request(postId),
  });
};
