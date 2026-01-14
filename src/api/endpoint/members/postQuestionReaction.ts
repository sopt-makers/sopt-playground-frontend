import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { z } from 'zod';

import { GetMemberQuestionsResponse } from '@/api/endpoint/members/getMemberQuestions';
import { createEndpoint } from '@/api/typedAxios';

/**
 * @desc 질문에 반응(나도 궁금해요) 추가/취소
 */
export const postQuestionReaction = createEndpoint({
  request: ({ answerId }: { answerId: number }) => ({
    method: 'POST',
    url: `/api/v1/members/answers/${answerId}/reactions`,
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
  }),
});

export const usePostQuestionReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answerId: number) => postQuestionReaction.request({ answerId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
    },
  });
};

interface UseToggleQuestionReactionParams {
  answerId: number;
  isReacted: boolean;
  reactionCount: number;
  questionQueryKeys: unknown[][];
}

export const useToggleQuestionReactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ answerId }: UseToggleQuestionReactionParams): Promise<unknown> => {
      return postQuestionReaction.request({ answerId });
    },
    onMutate: async ({ answerId, isReacted, reactionCount, questionQueryKeys }) => {
      // 모든 관련 쿼리 취소
      await Promise.all(questionQueryKeys.map((queryKey) => queryClient.cancelQueries({ queryKey })));

      // 이전 데이터 저장
      const previousDataMap = new Map<string, GetMemberQuestionsResponse>();
      questionQueryKeys.forEach((queryKey) => {
        const previousData = queryClient.getQueryData<GetMemberQuestionsResponse>(queryKey);
        if (previousData) {
          previousDataMap.set(JSON.stringify(queryKey), previousData);
        }
      });

      // Optimistic update
      questionQueryKeys.forEach((queryKey) => {
        queryClient.setQueryData<GetMemberQuestionsResponse>(queryKey, (oldData) => {
          if (!oldData) return oldData;

          return produce(oldData, (draft) => {
            draft.questions.forEach((question) => {
              if (question.questionId === answerId) {
                question.reactionCount = isReacted ? reactionCount - 1 : reactionCount + 1;
                question.isReacted = !isReacted;
              }
            });
          });
        });
      });

      return { previousDataMap };
    },
    onError: (_error, _variables, context) => {
      // 에러 시 이전 데이터로 롤백
      if (context?.previousDataMap) {
        context.previousDataMap.forEach((previousData, queryKeyString) => {
          const queryKey = JSON.parse(queryKeyString);
          queryClient.setQueryData(queryKey, previousData);
        });
      }
    },
    onSuccess: (_data, _variables, context) => {
      // 성공 시 관련 쿼리 무효화
      if (context?.previousDataMap) {
        context.previousDataMap.forEach((_previousData, queryKeyString) => {
          const queryKey = JSON.parse(queryKeyString);
          queryClient.invalidateQueries({ queryKey });
        });
      }
      // 전체 질문 목록도 무효화
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
    },
  });
};
