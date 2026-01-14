import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

/**
 * @desc 질문 삭제 (본인 질문 삭제 / 답변 작성 후에는 답변자만 삭제 가능)
 */
export const deleteMemberQuestion = createEndpoint({
  request: ({ questionId }: { questionId: number }) => ({
    method: 'DELETE',
    url: `api/v1/members/questions/${questionId}`,
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
  }),
});

export const useDeleteMemberQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId: number) => deleteMemberQuestion.request({ questionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
      queryClient.invalidateQueries({ queryKey: ['getUnansweredQuestionCount'] });
    },
  });
};

export const deleteMemberQuestionAnswer = createEndpoint({
  request: ({ answerId }: { answerId: number }) => ({
    method: 'DELETE',
    url: `api/v1/members/questions/answers/${answerId}`,
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
  }),
});

export const useDeleteMemberQuestionAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answerId: number) => deleteMemberQuestionAnswer.request({ answerId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
    },
  });
};
