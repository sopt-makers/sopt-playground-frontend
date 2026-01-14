import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

/**
 * @desc 질문에 답변 작성
 */
export const postQuestionAnswer = createEndpoint({
  request: ({ questionId, content }: { questionId: number; content: string }) => ({
    method: 'POST',
    url: `api/v1/members/questions/${questionId}/answers`,
    data: { content },
  }),
  serverResponseScheme: z.object({
    answerId: z.number(),
    content: z.string(),
    createdAt: z.string(),
  }),
});

export const usePostQuestionAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, content }: { questionId: number; content: string }) =>
      postQuestionAnswer.request({ questionId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
      queryClient.invalidateQueries({ queryKey: ['getUnansweredQuestionCount'] });
    },
  });
};
