import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

/**
 * @desc 질문 답변 수정
 */
export const putQuestionAnswer = createEndpoint({
  request: ({ questionId, answerId, content }: { questionId: number; answerId: number; content: string }) => ({
    method: 'PUT',
    url: `api/v1/members/questions/${questionId}/answers/${answerId}`,
    data: { content },
  }),
  serverResponseScheme: z.object({
    answerId: z.number(),
    content: z.string(),
    createdAt: z.string(),
  }),
});

export const usePutQuestionAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, answerId, content }: { questionId: number; answerId: number; content: string }) =>
      putQuestionAnswer.request({ questionId, answerId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
    },
  });
};

