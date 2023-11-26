import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const userSchema = z.object({
  id: z.number(),
  profileImage: z
    .string()
    .nullable()
    .transform((profileImage) => profileImage ?? ''),
  name: z.string(),
});

const winnerSchema = z.object({
  roomId: z.number(),
  winner: userSchema,
});

export const getWordchainWinners = createEndpoint({
  request: (options: { limit: number; cursor: number }) => ({
    method: 'GET',
    url: `/api/v1/chainWordGame/winners?limit=${options.limit}&cursor=${options.cursor}`,
  }),
  serverResponseScheme: z.object({
    winners: z.array(winnerSchema),
    hasNext: z.boolean(),
  }),
});
