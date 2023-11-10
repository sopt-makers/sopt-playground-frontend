import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getMembersSearchByName } from '@/api/endpoint/members/getMembersSearchByName';
import {
  getMemberProfileById,
  getMemberProfileOfMe,
  postMemberMessage as postMemberMessage,
} from '@/api/endpoint_LEGACY/members';
import { PostMemberMessageVariables, ProfileDetail } from '@/api/endpoint_LEGACY/members/type';

// 멤버 프로필 조회
export const useGetMemberProfileById = (
  id: number | undefined,
  options?: Omit<
    UseQueryOptions<unknown, AxiosError, ProfileDetail, (string | number | undefined)[]>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: ['getMemberProfileById', id],

    queryFn: async () => {
      const data = await getMemberProfileById(id);
      return data;
    },
    enabled: !!id,
    ...options,
  });
};

// 자신의 토큰으로 프로필 조회
export const useGetMemberProfileOfMe = (
  options?: Omit<UseQueryOptions<ProfileDetail, { message: string }, ProfileDetail, string[]>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['getMemberProfileOfMe'],

    queryFn: async () => {
      const data = await getMemberProfileOfMe();
      return data;
    },
    ...options,
  });
};

export const useGetMembersSearchByName = (name: string) => {
  return useQuery({
    queryKey: ['getMembersSearchByName', name],

    queryFn: async () => {
      const data = await getMembersSearchByName.request(name);
      return data;
    },
  });
};

export const usePostMemberMessageMutation = () => {
  return useMutation({
    mutationFn: async (variables: PostMemberMessageVariables) => await postMemberMessage(variables),
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });
};
