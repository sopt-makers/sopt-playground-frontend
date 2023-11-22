import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const postReportComment = createEndpoint({
  request: (commentId: string) => ({
    method: 'POST',
    url: `api/v1/community/comment/${commentId}/report`,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostReportCommentMutation = () => {
  return useMutation({
    mutationFn: (commentId: string) => postReportComment.request(commentId),
  });
};
