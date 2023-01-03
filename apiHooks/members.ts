import { QueryKey, useInfiniteQuery, useMutation, useQuery } from 'react-query';

import {
  getMemberOfMe,
  getMemberProfile,
  getMemberProfileById,
  getMemberProfileOfMe,
  getMembersSearchByName,
  postMemberCoffeeChat,
} from '@/api/members';
import { PostMemberCoffeeChatVariables, Profile } from '@/api/members/type';

interface Variables {
  limit?: number;
  queryKey?: QueryKey;
}

// 멤버 프로필 전체 조회
export const useGetMemberProfile = ({ limit, queryKey }: Variables) => {
  const _queryKey = (typeof queryKey === 'string' ? [queryKey] : queryKey) ?? [];
  return useInfiniteQuery({
    queryKey: ['getMemberProfile', limit, ..._queryKey],
    queryFn: async ({ pageParam: cursor = 0 }) => {
      const params = { limit, cursor };

      const apiUrl = new URL(window.location.href);
      Object.entries(params).forEach(
        ([query, value]) => value !== undefined && apiUrl.searchParams.set(query, value.toString()),
      );

      const data = await getMemberProfile(apiUrl.search);
      return data;
    },
    getNextPageParam: (lastPage: Profile[]) => {
      // TODO(@jun): nextPage 있는지 여부 boolean으로 undefined 예외처리
      if (!lastPage.length) {
        return undefined;
      }
      const lastIndex = lastPage.length - 1;
      const lastMemberId = lastPage[lastIndex].id;
      return lastMemberId;
    },
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
    keepPreviousData: true,
  });
};

// 멤버 프로필 조회
export const useGetMemberOfMe = () => {
  return useQuery(
    ['getMemberOfMe'],
    async () => {
      const data = await getMemberOfMe();
      return data;
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
    },
  );
};

// 멤버 프로필 조회
export const useGetMemberProfileById = (id: number | undefined) => {
  return useQuery(
    ['getMemberProfileById', id],
    async () => {
      const data = await getMemberProfileById(id);
      return data;
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
      enabled: !!id,
    },
  );
};

// 자신의 토큰으로 프로필 조회
export const useGetMemberProfileOfMe = () => {
  return useQuery(
    ['getMemberProfileOfMe'],
    async () => {
      const data = await getMemberProfileOfMe();
      return data;
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
    },
  );
};

export const useGetMembersSearchByName = (name: string) => {
  return useQuery(
    ['getMembersSearchByName', name],
    async () => {
      const data = await getMembersSearchByName(name);
      return data;
    },
    {
      onError: (error: { message: string }) => {
        console.error(error.message);
      },
    },
  );
};

export const usePostCoffeeChatMutation = () => {
  return useMutation(async (variables: PostMemberCoffeeChatVariables) => await postMemberCoffeeChat(variables), {
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });
};
