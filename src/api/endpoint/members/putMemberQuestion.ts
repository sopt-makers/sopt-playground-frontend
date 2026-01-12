import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const putMemberQuestionResponseScheme = z.object({
  success: z.boolean(),
});

interface PutMemberQuestionRequest {
  questionId: number;
  content: string;
}

export const putMemberQuestion = createEndpoint({
  request: ({ questionId, content }: PutMemberQuestionRequest) => ({
    method: 'PUT',
    url: `api/v1/members/questions/${questionId}`,
    data: {
      content,
    },
  }),
  serverResponseScheme: putMemberQuestionResponseScheme,
});

export const usePutMemberQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PutMemberQuestionRequest) => putMemberQuestion.request(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
      queryClient.invalidateQueries({ queryKey: ['getUnansweredQuestionCount'] });
    },
  });
};
