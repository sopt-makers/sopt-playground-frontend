import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

/**
 * @desc 질문 신고
 */
export const postQuestionReport = createEndpoint({
  request: ({ questionId, reason }: { questionId: number; reason: string }) => ({
    method: 'POST',
    url: `api/v1/members/questions/${questionId}/report`,
    data: {
      reason,
    },
  }),
  serverResponseScheme: z.object({}),
});

export const usePostQuestionReport = () => {
  return useMutation({
    mutationFn: ({ questionId, reason }: { questionId: number; reason: string }) =>
      postQuestionReport.request({ questionId, reason }),
  });
};
