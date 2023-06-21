import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

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
  return useMutation(async () => {
    const response = await newGame.request();
    return response;
  });
};
