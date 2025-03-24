import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import z from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { TimecapsopTag } from '@/components/resolution/constants';

export interface ResolutionRequestBody {
  content: string;
  tags: TimecapsopTag[];
}

export const postResolution = createEndpoint({
  request: (requestBody: ResolutionRequestBody) => ({
    method: 'POST',
    url: `api/v1/resolution`,
    data: requestBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostResolutionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['postResolution'],
    mutationFn: async (requestBody: ResolutionRequestBody) => {
      const response = await postResolution.request(requestBody);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getResolutionValidation'] });
    },
  });
};
