import { useMutation } from '@tanstack/react-query';

import { createEndpoint } from '@/api/typedAxios';
import { ResolutionTag } from '@/components/resolutiion/ResolutionModal';

interface RequestBody {
  content: string;
  tags: ResolutionTag[];
}

export const postResolution = createEndpoint({
  request: (reqestBody: RequestBody) => ({
    method: 'POST',
    url: `api/v1/resolution`,
    data: reqestBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostResolutionMutation = () => {
  return useMutation({
    mutationKey: ['postResolution'],
    mutationFn: async (requestBody: RequestBody) => {
      const response = await postResolution.request(requestBody);
      return response;
    },
  });
};
