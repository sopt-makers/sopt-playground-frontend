import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const getResolution = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/resolution',
  },
  serverResponseScheme: z.object({
    memberName: z.string(),
    tags: z.array(z.string()),
    content: z.string(),
  }),
});

export const useGetResolution = () => {
  return useQuery({
    queryKey: ['getResolution'],
    queryFn: async () => {
      const data = await getResolution.request();
      return data;
    },
  });
};
