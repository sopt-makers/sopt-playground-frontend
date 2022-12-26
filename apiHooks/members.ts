import { useRouter } from 'next/router';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';

import {
  getMemberOfMe,
  getMemberProfile,
  getMemberProfileById,
  getMemberProfileOfMe,
  getMemebersSearchByName,
  postMemberCoffeeChat,
} from '@/api/members';
import { PostMemberCoffeeChatVariables, Profile } from '@/api/members/type';

interface Variables {
  filter?: number;
  limit?: number;
}

// 멤버 프로필 전체 조회
export const useGetMemberProfile = (input: Variables) => {
  const router = useRouter();
  return useInfiniteQuery({
    queryKey: ['getMemberProfile', input],
    queryFn: async ({ pageParam: cursor = 0 }) => {
      const params = { ...input, cursor };

      const url = new URL(`${window.location.origin}${window.location.pathname}`);
      Object.entries(params).forEach(([query, value]) => url.searchParams.set(query, value.toString()));
      router.push(url);

      const data = await getMemberProfile(url.search);
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
      const data = await getMemebersSearchByName(name);
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
