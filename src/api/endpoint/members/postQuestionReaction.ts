import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

/**
 * @desc 질문에 반응(나도 궁금해요) 추가/취소
 */
export const postQuestionReaction = createEndpoint({
  request: ({ questionId }: { questionId: number }) => ({
    method: 'POST',
    url: `api/v1/members/questions/${questionId}/reactions`,
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
  }),
});

export const usePostQuestionReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId: number) => postQuestionReaction.request({ questionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
    },
  });
};
