import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const getUnansweredQuestionCountResponseScheme = z.object({
  count: z.number(),
});

export type GetUnansweredQuestionCountResponse = z.infer<typeof getUnansweredQuestionCountResponseScheme>;

/**
 * @desc 본인에게 달린 미답변 질문 개수 조회
 */
export const getUnansweredQuestionCount = createEndpoint({
  request: () => ({
    method: 'GET',
    url: 'api/v1/members/me/questions/unanswered-count',
  }),
  serverResponseScheme: getUnansweredQuestionCountResponseScheme,
});

interface UseGetUnansweredQuestionCountOptions {
  enabled?: boolean;
}

export const useGetUnansweredQuestionCount = (options?: UseGetUnansweredQuestionCountOptions) => {
  return useQuery({
    queryKey: ['getUnansweredQuestionCount'],
    queryFn: () => getUnansweredQuestionCount.request(),
    enabled: options?.enabled ?? true,
  });
};
