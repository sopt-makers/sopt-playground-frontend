import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import z from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const deleteResolution = createEndpoint({
  request: () => ({
    method: 'delete',
    url: `api/v1/resolution`,
  }),
  serverResponseScheme: z.unknown(),
});

export const useDeleteResolutionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteResolution'],
    mutationFn: async () => {
      const response = await deleteResolution.request();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getResolutionValidation'] });
    },
  });
};
