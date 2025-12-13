import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { WorkPreferenceType } from '@/components/matchmember/constant';

export const postWorkPreference = createEndpoint({
  request: (requestBody: WorkPreferenceType) => ({
    method: 'PATCH',
    url: `api/v1/members/work-preference`,
    data: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostWorkPreferenceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestBody: WorkPreferenceType) => postWorkPreference.request(requestBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getRecommendations'] });
      queryClient.invalidateQueries({ queryKey: ['getMemberOfMe'] });
    },
  });
};
