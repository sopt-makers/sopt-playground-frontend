import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: number; queryKey: (string | Params | undefined)[] }) => postLike.request(postId),
    onSuccess: (data, { queryKey }) => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};

export const usePostUnlikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: number; queryKey: (string | Params | undefined)[] }) =>
      postUnlike.request(postId),
    onSuccess: (data, { queryKey }) => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};
