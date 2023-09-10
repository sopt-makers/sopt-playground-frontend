import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

import { createEndpoint, GetResponseType } from '@/api/typedAxios';

export const postWord = createEndpoint({
  request: (wordchainId: number, word: string) => ({
    method: 'POST',
    url: 'api/v1/chainWordGame/wordGame',
    data: { roomId: wordchainId, word },
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

export const usePostWord = (
  options?: Omit<
    UseMutationOptions<GetResponseType<typeof postWord>, AxiosError, { wordchainId: number; word: string }, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation(
    ['postWord'],
    async ({ wordchainId, word }: { wordchainId: number; word: string }) => {
      const response = await postWord.request(wordchainId, word);
      return response;
    },
    options,
  );
};
