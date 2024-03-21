import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const getResolutionValidation = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/resolution/validation',
  },
  serverResponseScheme: z.object({
    memberProfileImgUrl: z.string(),
    isRegistration: z.boolean(),
  }),
});

export const useGetResolutionValidation = () => {
  return useQuery({
    queryKey: ['getResolutionValidation'],
    queryFn: async () => {
      const data = await getResolutionValidation.request();
      return data;
    },
  });
};
