import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const deleteComment = createEndpoint({
  request: (commentId: string) => ({
    method: 'DELETE',
    url: `api/v1/community/comment/${commentId}`,
  }),
  serverResponseScheme: z.unknown(),
});

export const useDeleteCommentMutation = () => {
  return useMutation({
    mutationFn: (commentId: string) => deleteComment.request(commentId),
  });
};
