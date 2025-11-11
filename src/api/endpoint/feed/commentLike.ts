import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { z } from 'zod';

import { getComment } from '@/api/endpoint/feed/getComment';
import { activeCommentSchemaWithReplies } from '@/api/endpoint/feed/getComment';
import { createEndpoint } from '@/api/typedAxios';
export const commentLike = createEndpoint({
  request: (postId: number, commentId: number) => ({
    method: 'POST',
    url: `api/v1/community/${postId}/comment/${commentId}/like`,
  }),
  serverResponseScheme: z.unknown(),
});

export const commentUnlike = createEndpoint({
  request: (postId: number, commentId: number) => ({
    method: 'DELETE',
    url: `api/v1/community/${postId}/comment/${commentId}/unlike`,
  }),
  serverResponseScheme: z.unknown(),
});

export const useCommentLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }: { postId: number; commentId: number }) =>
      commentLike.request(postId, commentId),

    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: getComment.cacheKey(String(postId)) });
      const previousCommentData = queryClient.getQueryData(getComment.cacheKey(String(postId)));

      queryClient.setQueryData(
        getComment.cacheKey(String(postId)),
        (oldData: z.infer<typeof activeCommentSchemaWithReplies>) => {
          return produce(oldData, () => {
            oldData.likeCount = oldData.likeCount + 1;
            oldData.isLiked = true;
          });
        },
      );
      return { previousCommentData };
    },

    onError: (_, variables, context) => {
      queryClient.setQueryData(getComment.cacheKey(String(variables.postId)), context?.previousCommentData);
    },

    onSettled: (_, __, variables, ___) => {
      queryClient.invalidateQueries({ queryKey: getComment.cacheKey(String(variables.postId)) });
    },
  });
};

export const useCommentUnLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, commentId }: { postId: number; commentId: number }) =>
      commentUnlike.request(postId, commentId),

    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: getComment.cacheKey(String(postId)) });
      const previousCommentData = queryClient.getQueryData(getComment.cacheKey(String(postId)));

      queryClient.setQueryData(
        getComment.cacheKey(String(postId)),
        (oldData: z.infer<typeof activeCommentSchemaWithReplies>) => {
          return produce(oldData, () => {
            oldData.likeCount = oldData.likeCount - 1;
            oldData.isLiked = false;
          });
        },
      );
      return { previousCommentData };
    },

    onError: (_, variables, context) => {
      queryClient.setQueryData(getComment.cacheKey(String(variables.postId)), context?.previousCommentData);
    },

    onSettled: (_, __, variables, ___) => {
      queryClient.invalidateQueries({ queryKey: getComment.cacheKey(String(variables.postId)) });
    },
  });
};
