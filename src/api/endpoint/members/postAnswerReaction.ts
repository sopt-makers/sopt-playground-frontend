import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { z } from 'zod';

import { GetMemberQuestionsResponse } from '@/api/endpoint/members/getMemberQuestions';
import { createEndpoint } from '@/api/typedAxios';

/**
 * @desc 답변에 반응(도움돼요) 추가/취소
 */
export const postAnswerReaction = createEndpoint({
  request: ({ answerId }: { answerId: number }) => ({
    method: 'POST',
    url: `/api/v1/members/answers/${answerId}/reactions`,
  }),
  serverResponseScheme: z.object({
    success: z.boolean(),
  }),
});

export const usePostAnswerReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (answerId: number) => postAnswerReaction.request({ answerId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMemberQuestions'] });
    },
  });
};

interface UseToggleAnswerReactionParams {
  answerId: number;
  isReacted: boolean;
  reactionCount: number;
  questionQueryKeys: unknown[][];
}

export const useToggleAnswerReactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ answerId }: UseToggleAnswerReactionParams): Promise<unknown> => {
      return postAnswerReaction.request({ answerId });
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
              if (question.answer?.answerId === answerId) {
                question.answer.reactionCount = isReacted ? reactionCount - 1 : reactionCount + 1;
                question.answer.isReacted = !isReacted;
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
