import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { wordChainQueryKey } from '@/api/endpoint/wordchain/getWordchain';
import { createEndpoint } from '@/api/typedAxios';

export const newGame = createEndpoint({
  request: () => ({
    method: 'POST',
    url: 'api/v1/chainWordGame/newGame',
  }),
  serverResponseScheme: z.object({
    roomId: z.number(),
    word: z.string(),
    user: z.object({
      id: z.number(),
      profileImage: z
        .string()
        .nullable()
        .transform((profileImage) => profileImage ?? ''),
      name: z.string(),
    }),
  }),
});

export const useNewGameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await newGame.request();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [wordChainQueryKey.getRecentWordchain],
      });
      queryClient.invalidateQueries({
        queryKey: [wordChainQueryKey.getWordchain],
      });
    },
  });
};
