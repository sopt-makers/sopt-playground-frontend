import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import qs from 'qs';
import { QueryKey, useInfiniteQuery, useMutation, useQuery, UseQueryOptions } from 'react-query';

import {
  getMemberOfMe,
  getMemberProfile,
  getMemberProfileById,
  getMemberProfileOfMe,
  getMembersSearchByName,
  postMemberCoffeeChat,
} from '@/api/members';
import { PostMemberCoffeeChatVariables, Profile, ProfileDetail } from '@/api/members/type';

interface Variables {
  limit?: number;
  queryKey?: QueryKey;
}

// 멤버 프로필 전체 조회
export const useGetMemberProfile = ({ limit, queryKey }: Variables) => {
  const _queryKey = (typeof queryKey === 'string' ? [queryKey] : queryKey) ?? [];
  const { query } = useRouter();
  return useInfiniteQuery({
    queryKey: ['getMemberProfile', limit, ..._queryKey],
    queryFn: async ({ pageParam: cursor = 0 }) => {
      const searchParams = { limit, cursor, ...query };
      const data = await getMemberProfile(qs.stringify(searchParams, { addQueryPrefix: true }));
      return data;
    },
    getNextPageParam: (lastPage: Profile[]) => {
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
export const useGetMemberProfileById = (
  id: number | undefined,
  options?: Omit<
    UseQueryOptions<unknown, AxiosError, ProfileDetail, (string | number | undefined)[]>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery(
    ['getMemberProfileById', id],
    async () => {
      const data = await getMemberProfileById(id);
      return data;
    },
    {
      ...options,
      onError: (error: AxiosError) => {
        options?.onError?.(error);
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
