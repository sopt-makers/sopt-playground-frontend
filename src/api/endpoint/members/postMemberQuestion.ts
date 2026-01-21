import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const postMemberQuestionResponseScheme = z.object({
  questionId: z.number(),
});

interface PostMemberAskRequest {
  receiverId: number;
  content: string;
  isAnonymous: boolean;
  latestSoptActivity: string;
}

export const postMemberAsk = createEndpoint({
  request: ({ receiverId, content, isAnonymous, latestSoptActivity }: PostMemberAskRequest) => ({
    method: 'POST',
    url: `api/v1/members/questions/${receiverId}`,
    data: {
      content,
      isAnonymous,
      latestSoptActivity,
    },
  }),
  serverResponseScheme: postMemberQuestionResponseScheme,
});

export const usePostMemberAsk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PostMemberAskRequest) => postMemberAsk.request(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
      queryClient.invalidateQueries({ queryKey: ['getUnansweredQuestionCount'] });
    },
  });
};
