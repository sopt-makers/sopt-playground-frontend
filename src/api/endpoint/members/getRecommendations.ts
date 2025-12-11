import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getRecommendations = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/members/work-preference/recommendations',
  },
  serverResponseScheme: z.object({
    hasWorkPreference: z.boolean(),
    recommendations: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          profileImage: z
            .string()
            .nullable()
            .transform((str) => str ?? ''),

          university: z.string().nullable(),

          workPreference: z.object({
            ideationStyle: z.string(),
            workTime: z.string(),
            communicationStyle: z.string(),
            workPlace: z.string(),
            feedbackStyle: z.string(),
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
      )
      .optional(),
  }),
});

export const useGetRecommendations = () => {
  return useQuery({
    queryKey: ['getRecommendations'],
    queryFn: () => getRecommendations.request(),
  });
};
