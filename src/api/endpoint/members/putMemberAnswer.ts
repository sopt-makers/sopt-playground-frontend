import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const putMemberAnswerResponseScheme = z.object({
  success: z.boolean(),
});

interface PutMemberAnswerRequest {
  answerId: number;
  content: string;
}

export const putMemberAnswer = createEndpoint({
  request: ({ answerId, content }: PutMemberAnswerRequest) => ({
    method: 'PUT',
    url: `api/v1/members/answers/${answerId}`,
    data: {
      content,
    },
  }),
  serverResponseScheme: putMemberAnswerResponseScheme,
});

export const usePutMemberAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PutMemberAnswerRequest) => putMemberAnswer.request(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
      queryClient.invalidateQueries({ queryKey: ['getUnansweredQuestionCount'] });
    },
  });
};

