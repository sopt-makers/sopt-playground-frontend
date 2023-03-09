import { axiosInstance } from '@/api';
import { Member, PostMemberCoffeeChatVariables, Profile, ProfileDetail, ProfileRequest } from '@/api/members/type';

// 멤버 프로필 전체 조회
export type MemberProfile = {
  members: Profile[];
  hasNext: boolean;
};
export const getMemberProfile = async (input: string) => {
  const { data } = await axiosInstance.request<MemberProfile>({
    method: 'GET',
    url: `api/v1/members/profile${input}`,
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
export const getMemberProfileById = async (id: number | undefined) => {
  if (typeof id === 'undefined') throw new Error('Invalid id');
  const { data } = await axiosInstance.request<ProfileDetail>({
    method: 'GET',
    url: `api/v1/members/profile/${id}`,
  });

  return data;
};

// 자신의 토큰으로 프로필 조회
export const getMemberProfileOfMe = async () => {
  const { data } = await axiosInstance.request<ProfileDetail>({
    method: 'GET',
    url: `api/v1/members/profile/me`,
  });

  return data;
};

export const postMemberProfile = async (body: ProfileRequest): Promise<Profile> => {
  const { data } = await axiosInstance.request({ method: 'POST', url: 'api/v1/members/profile', data: body });
  return data;
};

export const getMembersSearchByName = async (name: string) => {
  const { data } = await axiosInstance.request<Member[]>({
    method: 'GET',
    url: `api/v1/members/search?name=${name}`,
  });
  return data;
};

export const postMemberCoffeeChat = async (variables: PostMemberCoffeeChatVariables) => {
  const { data } = await axiosInstance.request<{
    success: boolean;
    message: string;
  }>({
    method: 'POST',
    url: 'api/v1/members/coffeechat',
    data: variables,
  });
  return data;
};
