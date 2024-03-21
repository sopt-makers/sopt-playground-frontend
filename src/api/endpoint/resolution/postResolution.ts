import { useMutation } from '@tanstack/react-query';
import z from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { ResolutionTag } from '@/components/resolution/ResolutionModal';

export interface ResolutionRequestBody {
  content: string;
  tags: ResolutionTag[];
}

export const postResolution = createEndpoint({
  request: (reqestBody: ResolutionRequestBody) => ({
    method: 'POST',
    url: `api/v1/resolution`,
    data: reqestBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostResolutionMutation = () => {
  return useMutation({
    mutationKey: ['postResolution'],
    mutationFn: async (requestBody: ResolutionRequestBody) => {
      const response = await postResolution.request(requestBody);
      return response;
    },
  });
};
