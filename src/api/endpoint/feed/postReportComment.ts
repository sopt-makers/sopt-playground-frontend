import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const postReportComment = createEndpoint({
  request: ({ commentId, postId }: { commentId: string; postId: string }) => ({
    method: 'POST',
    url: `api/v1/community/${postId}/comment/${commentId}/report`,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostReportCommentMutation = () => {
  return useMutation({
    mutationFn: ({ commentId, postId }: { commentId: string; postId: string }) =>
      postReportComment.request({ commentId, postId }),
  });
};
