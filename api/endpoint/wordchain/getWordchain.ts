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
    UseInfiniteQueryOptions<
      UseGetWordchainResponse,
      unknown,
      UseGetWordchainResponse,
      UseGetWordchainResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >;
}) =>
  useInfiniteQuery<UseGetWordchainResponse, unknown, UseGetWordchainResponse>(
    ['getWordchain', limit],
    async ({ pageParam: cursor = 0 }) => {
      const { rooms, hasNext } = await getWordchain.request({ limit, cursor });
      if (cursor === 0) {
        const finishedWordchainList: WordchainInfo[] = mapFinishedWordchainList(rooms.slice(1));
        const currentWordchain: WordchainInfo = {
          id: rooms[0].roomId,
          initial: { userName: rooms[0].startUser.name, word: rooms[0].startWord },
          isProgress: true,
          winnerName: null,
          order: rooms[0].roomId,
          wordList: rooms[0].words.map(({ word, user }) => ({ user, content: word })),
        };
        return { hasNext, wordchainList: [currentWordchain, ...finishedWordchainList] };
      }
      const wordchainList: WordchainInfo[] = mapFinishedWordchainList(rooms);
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
      select: (data): InfiniteData<UseGetWordchainResponse> => ({
        ...data,
        pages: [
          {
            wordchainList: data.pages
              .map(({ wordchainList }) => wordchainList)
              .flat()
              .reverse(),
            hasNext: data.pages[data.pages.length - 1].hasNext,
          },
        ],
      }),
    },
  );

const mapFinishedWordchainList = (rooms: z.infer<typeof roomSchema>[]): WordchainInfo[] =>
  rooms.map(({ roomId, words }) => ({
    id: roomId,
    initial: { userName: rooms[0].startUser.name, word: rooms[0].startWord },
    isProgress: false,
    order: roomId,
    winnerName: words.length ? words[words.length - 1].user.name : '',
    wordList: words.map(({ word, user }) => ({ user, content: word })),
  }));

export const useGetRecentWordchain = () => {
  return useQuery(['getRecentWordchain'], async () => {
    const data = await getWordchain.request({
      limit: 0,
      cursor: 0,
    });

    const firstRoom = data.rooms[0];
    const firstGameWords = firstRoom.words;
    const lastWord = getLastWord(firstGameWords);

    return {
      words: firstGameWords.slice(-2),
      startWord: firstRoom.startWord,
      currentWinner: lastWord ? lastWord.user : null,
      nextSyllable: lastWord
        ? lastWord.word.charAt(lastWord.word.length - 1)
        : firstRoom.startWord.charAt(firstRoom.startWord.length - 1),
    };
  });
};

const getLastWord = (words: z.infer<typeof roomSchema>['words']) => {
  return words.length > 0 ? words[words.length - 1] : null;
};

export const wordChainQueryKey = {
  getWordchain: 'getWordchain',
  getRecentWordchain: 'getRecentWordchain',
};
