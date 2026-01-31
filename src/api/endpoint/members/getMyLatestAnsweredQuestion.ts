import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const getMyLatestAnsweredQuestionResponseScheme = z.object({
  questionId: z.number().nullable(),
  page: z.number().nullable(),
  index: z.number().nullable(),
});

export type GetMyLatestAnsweredQuestionResponse = z.infer<
  typeof getMyLatestAnsweredQuestionResponseScheme
>;


interface GetMyLatestAnsweredQuestionRequest {
  memberId: number;
}

export const getMyLatestAnsweredQuestion = createEndpoint({
  request: ({ memberId }: GetMyLatestAnsweredQuestionRequest) => ({
    method: 'GET',
    url: `/api/v1/members/${memberId}/questions/my-latest-answered`,
  }),
  serverResponseScheme: getMyLatestAnsweredQuestionResponseScheme,
});


export const useGetMyLatestAnsweredQuestion = (
  memberId: number | null | undefined,
) => {
  return useQuery({
    queryKey: ['getMyLatestAnsweredQuestion', memberId],
    queryFn: () =>
      getMyLatestAnsweredQuestion.request({ memberId: memberId as number }),
    enabled: Boolean(memberId),
  });
};
