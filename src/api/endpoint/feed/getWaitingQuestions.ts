import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const waitingQuestionSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  likeCount: z.number(),
  commentCount: z.number(),
  isAnswered: z.boolean(),
});

export type WaitingQuestion = z.infer<typeof waitingQuestionSchema>;

const getWaitingQuestions = createEndpoint({
  request: {
    method: 'GET',
    url: '/api/v1/community/posts/question',
  },
  serverResponseScheme: z.array(waitingQuestionSchema),
});

export const useWaitingQuestions = () =>
  useQuery({
    queryKey: ['waitingQuestions'],
    queryFn: () => getWaitingQuestions.request(),
  });
