import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const deleteComment = createEndpoint({
  request: (commentId: number) => ({
    method: 'DELETE',
    url: `api/v1/community/comment/${commentId}`,
  }),
  serverResponseScheme: z.unknown(),
});

export const useDeleteCommentMutation = (commentId: number) => {
  return useMutation({
    mutationFn: async () => {
      const data = await deleteComment.request(commentId);
      return data;
    },
  });
};
