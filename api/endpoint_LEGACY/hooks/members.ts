import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getMembersSearchByName } from '@/api/endpoint/members';
import {
  getMemberOfMe,
  getMemberProfileById,
  getMemberProfileOfMe,
  postMemberCoffeeChat,
} from '@/api/endpoint_LEGACY/members';
import { PostMemberCoffeeChatVariables, ProfileDetail } from '@/api/endpoint_LEGACY/members/type';

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
export const useGetMemberProfileOfMe = (
  options?: Omit<UseQueryOptions<ProfileDetail, { message: string }, ProfileDetail, string[]>, 'queryKey' | 'queryFn'>,
) => {
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
      ...options,
    },
  );
};

export const useGetMembersSearchByName = (name: string) => {
  return useQuery(
    ['getMembersSearchByName', name],
    async () => {
      const data = await getMembersSearchByName.request(name);
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