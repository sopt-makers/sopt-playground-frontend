import { axiosInstance } from '@/api';
import { Member, Profile, ProfileRequest } from '@/api/members/type';

// 멤버 프로필 전체 조회
export const getMemberProfile = async () => {
  const { data } = await axiosInstance.request<Profile[]>({
    method: 'GET',
    url: `api/v1/members/profile`,
  });

  return data;
};

// 유저 id로 조회
export const getMemberById = async (id: number) => {
  const { data } = await axiosInstance.request<Member>({
    method: 'GET',
    url: `api/v1/members/${id}`,
  });

  return data;
};

// 자신의 토큰으로 조회
export const getMemberOfMe = async () => {
  const data = await axiosInstance.request<Member>({
    method: 'GET',
    url: `api/v1/members/me`,
  });

  return data.data;
};

// 멤버 프로필 조회
export const getMemberProfileById = async (id: number) => {
  const { data } = await axiosInstance.request<Profile>({
    method: 'GET',
    url: `api/v1/members/profile/${id}`,
  });

  return data;
};

// 자신의 토큰으로 프로필 조회
export const getMemberProfileOfMe = async () => {
  const { data } = await axiosInstance.request<Profile>({
    method: 'GET',
    url: `api/v1/members/profile/me`,
  });

  return data;
};

export const postMemberProfile = async (body: ProfileRequest): Promise<Profile & { id: string }> => {
  const { data } = await axiosInstance.request({ method: 'POST', url: 'api/v1/members/profile', data: body });
  return data;
};
