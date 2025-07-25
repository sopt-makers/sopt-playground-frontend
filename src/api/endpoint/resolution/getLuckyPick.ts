import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const getLuckyPick = createEndpoint({
  request: {
    method: 'GET',
    url: 'api/v1/resolution/lucky-pick',
  },
  serverResponseScheme: z.object({
    isWinner: z.boolean(),
  }),
});

export const useGetLuckyPick = (enabled: boolean) => {
  return useQuery({
    queryKey: getLuckyPick.cacheKey(),
    queryFn: async () => {
      const data = await getLuckyPick.request();
      return data;
    },
    enabled: enabled,
  });
};
