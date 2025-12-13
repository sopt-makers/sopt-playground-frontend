import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getWorkPreferenceRecommendationMembers = createEndpoint({
  request: () => ({
    method: 'GET',
    url: 'api/v1/members/work-preference/recommendation',
  }),
  serverResponseScheme: z.object({
    recommendations: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        profileImage: z
          .string()
          .nullable()
          .transform((str) => str ?? ''),
        birthday: z.string().nullable().default(''),
        university: z.string().nullable().default(''),
        mbti: z.string().nullable(),
        workPreference: z.object({
          ideationStyle: z.enum(['즉흥', '숙고']),
          workTime: z.enum(['아침', '밤']),
          communicationStyle: z.enum(['몰아서', '나눠서']),
          workPlace: z.enum(['카공', '집콕']),
          feedbackStyle: z.enum(['직설적', '돌려서']),
        }),
        activities: z.array(
          z.object({
            id: z.number(),
            generation: z.number(),
            part: z.string(),
            team: z.string().nullable(),
          }),
        ),
      }),
    ),
  }),
});

export const useGetWorkPreferenceRecommendationMembers = () => {
  return useQuery({
    queryKey: ['getWorkPreferenceRecommendationMembers'],
    queryFn: () => getWorkPreferenceRecommendationMembers.request(),
  });
};
