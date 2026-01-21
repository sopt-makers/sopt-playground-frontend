import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const postMemberQuestionAnswerResponseScheme = z.object({
  answerId: z.number(),
});

interface PostMemberQuestionAnswerRequest {
  questionId: number;
  content: string;
}

export const postMemberQuestionAnswer = createEndpoint({
  request: ({ questionId, content }: PostMemberQuestionAnswerRequest) => ({
    method: 'POST',
    url: `/api/v1/members/questions/${questionId}/answer`,
    data: { content },
  }),
  serverResponseScheme: postMemberQuestionAnswerResponseScheme,
});

export const usePostMemberQuestionAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PostMemberQuestionAnswerRequest) => postMemberQuestionAnswer.request(params),
    onSuccess: (_res, variables) => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
      queryClient.invalidateQueries({ queryKey: ['getUnansweredQuestionCount'] });
    },
  });
};
