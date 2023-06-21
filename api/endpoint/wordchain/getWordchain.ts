import { InfiniteData, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';
import { WordchainInfo } from '@/components/wordchain/WordchainChatting/types';

const userSchema = z.object({
  id: z.number(),
  profileImage: z
    .string()
    .nullable()
    .transform((profileImage) => profileImage ?? ''),
  name: z.string(),
});

const roomSchema = z.object({
  roomId: z.number(),
  startWord: z.string(),
  startUser: userSchema.nullable().transform((user) => user ?? { id: -1, profileImage: '', name: '' }),
  words: z.array(
    z.object({
      word: z.string(),
      user: userSchema,
    }),
  ),
});

export const getWordchain = createEndpoint({
  request: (options: { limit: number; cursor: number }) => ({
    method: 'GET',
    url: `api/v1/chainWordGame/gameRoom?limit=${options.limit}&cursor=${options.cursor}`,
  }),
  serverResponseScheme: z.object({
    rooms: z.array(roomSchema),
    hasNext: z.boolean(),
  }),
});

export type UseGetWordchainResponse = { hasNext: boolean; wordchainList: WordchainInfo[] };

export const useGetWordchain = ({
  limit,
  queryOptions,
}: {
  limit: number;
  queryOptions?: Omit<
    UseInfiniteQueryOptions<UseGetWordchainResponse, unknown, WordchainInfo, UseGetWordchainResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >;
}) =>
  useInfiniteQuery<UseGetWordchainResponse, unknown, WordchainInfo>(
    ['getWordchain', limit],
    async ({ pageParam: cursor = 0 }) => {
      const { rooms, hasNext } = await getWordchain.request({ limit, cursor });
      if (cursor === 0) {
        const finishedWordchainList: WordchainInfo[] = mapFinishedWordchainList(rooms.slice(1)).reverse();
        const currentWordchain: WordchainInfo = {
          id: rooms[0].roomId,
          initial: { userName: rooms[0].words[0].user.name, word: rooms[0].words[0].word },
          isProgress: true,
          winnerName: null,
          order: rooms[0].roomId,
          wordList: rooms[0].words.map(({ word, user }) => ({ user, content: word })),
        };
        return { hasNext, wordchainList: [...finishedWordchainList, currentWordchain] };
      }
      const wordchainList: WordchainInfo[] = mapFinishedWordchainList(rooms).reverse();
      return { hasNext, wordchainList };
    },
    {
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.hasNext) {
          return undefined;
        }
        const totalPageNum = allPages.length * limit;
        return totalPageNum;
      },
      select: (data): InfiniteData<WordchainInfo> => ({
        ...data,
        pages: data.pages.map(({ wordchainList }) => wordchainList).flat(),
      }),
    },
  );

const mapFinishedWordchainList = (rooms: z.infer<typeof roomSchema>[]): WordchainInfo[] =>
  rooms.map(({ roomId, words }) => ({
    id: roomId,
    initial: { userName: words[0].user.name, word: words[0].word },
    isProgress: false,
    order: roomId,
    winnerName: words[words.length - 1].user.name,
    wordList: words.map(({ word, user }) => ({ user, content: word })),
  }));

export const useGetRecentWordchain = () => {
  return useQuery(
    ['useGetRecentWordchain'],
    async () => {
      const data = await getWordchain.request({
        limit: 0,
        cursor: 0,
      });
      return data;
    },
    {
      select: ({ rooms }) => {
        const firstGameWords = rooms[0].words;
        const lastWord = firstGameWords[firstGameWords.length - 1];
        return {
          words: firstGameWords.slice(-2),
          currentWinner: lastWord.user,
          nextStartWord: lastWord.word.charAt(lastWord.word.length - 1),
        };
      },
    },
  );
};
