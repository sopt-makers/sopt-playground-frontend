import { useQuery } from 'react-query';

import {
  getMemberById,
  getMemberOfMe,
  getMemberProfile,
  getMemberProfileById,
  getMemberProfileOfMe,
  getMemebersSearchByName,
} from '@/api/members';

// 멤버 프로필 전체 조회
export const useGetMemberProfile = () => {
  return useQuery(
    ['getMemberProfile'],
    async () => {
      const data = await getMemberProfile();
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
export const useGetMemberById = (id: number) => {
  return useQuery(
    ['getMemberById', id],
    async () => {
      const data = await getMemberById(id);
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
