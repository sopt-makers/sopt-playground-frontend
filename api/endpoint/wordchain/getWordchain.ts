import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint, GetResponseType } from '@/api/typedAxios';
import { ActiveWordchain, FinishedWordchain } from '@/components/wordchain/WordchainChatting/types';
import { EntryWordchain } from '@/components/wordchain/WordchainEntry/types';

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

type Response = GetResponseType<typeof getWordchain>;

export const wordChainQueryKey = {
  getWordchain: 'getWordchain',
  getRecentWordchain: 'getRecentWordchain',
};

type FinishedWordchainListPage = {
  hasNext: boolean;
  wordchainList: FinishedWordchain[];
};
export const useGetFinishedWordchainList = ({
  limit,
  queryOptions,
}: {
  limit: number;
  queryOptions: Omit<
    UseInfiniteQueryOptions<
      FinishedWordchainListPage,
      unknown,
      FinishedWordchainListPage,
      FinishedWordchainListPage,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >;
}) =>
  useInfiniteQuery<FinishedWordchainListPage, unknown, FinishedWordchainListPage>(
    ['getWordchain', limit],
    async ({ pageParam: cursor = 0 }) => {
      const response = await getWordchain.request({ limit, cursor });
      const wordchainList =
        cursor === 0 ? mapFinishedWordchainList(response.rooms.slice(1)) : mapFinishedWordchainList(response.rooms);
      const page = { hasNext: response.hasNext, wordchainList };
      return page;
    },
    {
      ...queryOptions,
      getNextPageParam: (lastPage) => {
        const lastWordchain = lastPage.wordchainList[lastPage.wordchainList.length - 1];
        if (!lastPage.hasNext || !lastWordchain || !lastWordchain.id) {
          return undefined;
        }
        return lastWordchain.id;
      },
    },
  );

type UseGetRecentWordchain = <TData = Response>(
  options?: Omit<UseQueryOptions<Response, unknown, TData, QueryKey>, 'queryKey' | 'queryFn'>,
) => UseQueryResult<TData, unknown>;

export const useGetRecentWordchain: UseGetRecentWordchain = <TData>(
  options?: Omit<UseQueryOptions<Response, unknown, TData, QueryKey>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery(
    [wordChainQueryKey.getRecentWordchain],
    async () => {
      const data = await getWordchain.request({
        limit: 0,
        cursor: 0,
      });
      return data;
    },
    options,
  );
};

export const useGetEntryWordchain = () =>
  useGetRecentWordchain<EntryWordchain>({
    select: (data: Response) => {
      const firstRoom = data.rooms[0];
      const firstGameWords = firstRoom.words;
      const lastWord = firstGameWords.length > 0 ? firstGameWords[firstGameWords.length - 1] : null;

      return {
        wordList: firstGameWords.slice(-2),
        startWord: firstRoom.startWord,
        currentWinner: lastWord ? lastWord.user : null,
        nextSyllable: lastWord
          ? lastWord.word.charAt(lastWord.word.length - 1)
          : firstRoom.startWord.charAt(firstRoom.startWord.length - 1),
      };
    },
  });

export const useGetActiveWordchain = (
  options?: Omit<UseQueryOptions<Response, unknown, ActiveWordchain, QueryKey>, 'queryKey' | 'queryFn'>,
) =>
  useGetRecentWordchain<ActiveWordchain>({
    ...options,
    select: (data) => {
      const activeWordchainData = data.rooms[0];
      const activeWordchain: ActiveWordchain = {
        id: activeWordchainData.roomId,
        initial: { userName: activeWordchainData.startUser.name, word: activeWordchainData.startWord },
        order: activeWordchainData.roomId,
        wordList: activeWordchainData.words.map(({ word, user }) => ({ user, content: word })),
      };
      return activeWordchain;
    },
  });

export const useGetCurrentWinnerName = () =>
  useGetRecentWordchain<string | null>({
    select: (data: Response) => {
      const firstRoom = data.rooms[0];
      const firstGameWords = firstRoom.words;
      const lastWord = firstGameWords.length > 0 ? firstGameWords[firstGameWords.length - 1] : null;
      return lastWord ? lastWord.user.name : null;
    },
  });

const mapFinishedWordchainList = (rooms: z.infer<typeof roomSchema>[]): FinishedWordchain[] =>
  rooms.map(({ roomId, words, startUser, startWord }) => ({
    id: roomId,
    initial: { userName: startUser.name, word: startWord },
    order: roomId,
    winnerName: words.length ? words[words.length - 1].user.name : '',
    wordList: words.map(({ word, user }) => ({ user, content: word })),
  }));
