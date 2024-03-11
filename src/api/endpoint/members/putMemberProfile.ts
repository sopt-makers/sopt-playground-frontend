import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createEndpoint } from '@/api/typedAxios';
import { ProfileRequest } from '@/api/endpoint_LEGACY/members/type';

/**
 * @desc 멤버 프로필 수정
 */
export const putMemberProfile = createEndpoint({
  request: (body: ProfileRequest) => ({
    method: 'PUT',
    url: 'api/v1/members/profile',
    data: body,
  }),
  serverResponseScheme: z.object({
    id: z.number(),
    name: z.string(),
    profileImage: z.string(),
    birthday: z.string(),
    phone: z.string(),
    email: z.string(),
    address: z.string(),
    university: z.string(),
    major: z.string(),
    introduction: z.string(),
    skill: z.string(),
    mbti: z.string(),
    mbtiDescription: z.string(),
    sojuCapacity: z.number(),
    interest: z.string(),
    userFavor: z.object({
      isPourSauceLover: z.boolean(),
      isHardPeachLover: z.boolean(),
      isMintChocoLover: z.boolean(),
      isRedBeanFishBreadLover: z.boolean(),
      isSojuLover: z.boolean(),
      isRiceTteokLover: z.boolean(),
    }),
    idealType: z.string(),
    selfIntroduction: z.string(),
    activities: z.array(
      z.object({
        id: z.number(),
        generation: z.number(),
        part: z.string(),
        team: z.string(),
      }),
    ),
    links: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
        url: z.string(),
      }),
    ),
    careers: z.array(
      z.object({
        id: z.number(),
        companyName: z.string(),
        title: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        isCurrent: z.boolean(),
      }),
    ),
    allowOfficial: z.boolean(),
  }),
});

/**
 * @desc 멤버 프로필 연락처 마스킹
 */
export const putMemberPhoneBlind = createEndpoint({
  request: (body: { blind: boolean }) => ({
    method: 'PUT',
    url: 'api/v1/members/phone/blind',
    data: body,
  }),
  serverResponseScheme: z.object({
    '전화번호 마스킹 변경 성공': z.boolean(),
  }),
});

/**
 * @desc 멤버 프로필 이메일 마스킹
 */
export const putMemberEmailBlind = createEndpoint({
  request: (body: { blind: boolean }) => ({
    method: 'PUT',
    url: 'api/v1/members/email/blind',
    data: body,
  }),
  serverResponseScheme: z.object({
    '이메일 마스킹 변경 성공': z.boolean(),
  }),
});

export const usePutMemberProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ProfileRequest) => putMemberProfile.request(body),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['getMemberProfileOfMe'] });
      queryClient.invalidateQueries({ queryKey: ['getMemberProfileById', response.id] });
      queryClient.invalidateQueries({ queryKey: ['getMemberProfile'] });
    },
  });
};

export const usePutPhoneBlindMutation = () => {
  return useMutation({
    mutationFn: (body: { blind: boolean }) => putMemberPhoneBlind.request(body),
  });
};

export const usePutEmailBlindMutation = () => {
  return useMutation({
    mutationFn: (body: { blind: boolean }) => putMemberEmailBlind.request(body),
  });
};
