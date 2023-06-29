import { QueryKey, useInfiniteQuery, UseInfiniteQueryOptions, useQuery } from '@tanstack/react-query';

import { getWordchain } from '@/api/endpoint/wordchain/getWordchain';
import { WordchainInfo } from '@/components/wordchain/WordchainChatting/types';

import { mapFinishedWordchainList } from './../../../api/endpoint/wordchain/getWordchain';

export const useGetActiveWordchain = () =>
  useQuery(['getActiveWordchain'], async () => {
    const response = await getWordchain.request({
      limit: 0,
      cursor: 0,
    });
    const activeWordchainResponse = response.rooms[0];
    const activeWordchain: WordchainInfo = {
      id: activeWordchainResponse.roomId,
      initial: { userName: activeWordchainResponse.startUser.name, word: activeWordchainResponse.startWord },
      isProgress: true,
      winnerName: null,
      order: activeWordchainResponse.roomId,
      wordList: activeWordchainResponse.words.map(({ word, user }) => ({ user, content: word })),
    };
    return activeWordchain;
  });

type FinishedWordchainListPage = {
  hasNext: boolean;
  wordchainList: WordchainInfo[];
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
