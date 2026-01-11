import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const anonymousProfileScheme = z.object({
  nickname: z.string(),
  profileImgUrl: z.string(),
});

const answerScheme = z
  .object({
    answerId: z.number(),
    content: z.string(),
    createdAt: z.string(),
  })
  .nullable();

const questionScheme = z.object({
  questionId: z.number(),
  content: z.string(),
  askerId: z.number().nullable(),
  askerName: z.string().nullable(),
  askerProfileImage: z.string().nullable(),
  askerLatestGeneration: z.string(),
  anonymousProfile: anonymousProfileScheme.nullable(),
  isAnonymous: z.boolean(),
  reactionCount: z.number(),
  isReacted: z.boolean(),
  isAnswered: z.boolean(),
  answer: answerScheme,
  createdAt: z.string(),
  isNew: z.boolean(),
  isMine: z.boolean(),
  isReceived: z.boolean(),
});

const getMemberQuestionsResponseScheme = z.object({
  questions: z.array(questionScheme),
  currentPage: z.number(),
  pageSize: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
});

export type MemberQuestion = z.infer<typeof questionScheme>;
export type GetMemberQuestionsResponse = z.infer<typeof getMemberQuestionsResponseScheme>;
export type QuestionTab = 'answered' | 'unanswered';

/**
 * @desc 멤버 질문 목록 조회
 */
export const getMemberQuestions = createEndpoint({
  request: ({ memberId, query }: { memberId: string; query: { tab: QuestionTab; page?: number; size?: number } }) => ({
    method: 'GET',
    url: `api/v1/members/${memberId}/questions`,
    params: query,
  }),
  serverResponseScheme: getMemberQuestionsResponseScheme,
});

interface UseGetMemberQuestionsParams {
  memberId: string;
  tab: QuestionTab;
  page?: number;
  size?: number;
}

export const useGetMemberQuestions = ({ memberId, tab, page = 0, size = 10 }: UseGetMemberQuestionsParams) => {
  return useQuery({
    queryKey: ['getMemberQuestions', memberId, tab, page, size],
    queryFn: () => getMemberQuestions.request({ memberId, query: { tab, page, size } }),
    enabled: !!memberId,
  });
};
