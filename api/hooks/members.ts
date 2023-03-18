import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  getMemberOfMe,
  getMemberProfileById,
  getMemberProfileOfMe,
  getMembersSearchByName,
  postMemberCoffeeChat,
} from '@/api/members';
import { PostMemberCoffeeChatVariables, ProfileDetail } from '@/api/members/type';

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
