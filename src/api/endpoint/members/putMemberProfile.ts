import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { ProfileRequest } from '@/api/endpoint_LEGACY/members/type';
import { createEndpoint } from '@/api/typedAxios';

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
    profileImage: z.string().nullable(),
    birthday: z.string().nullable(),
    phone: z.string().nullable(),
    email: z.string().nullable(),
    address: z.string().nullable(),
    university: z.string().nullable(),
    major: z.string().nullable(),
    introduction: z.string().nullable(),
    skill: z.string().nullable(),
    mbti: z.string().nullable(),
    mbtiDescription: z.string().nullable(),
    sojuCapacity: z.number().nullable(),
    interest: z.string().nullable(),
    workPreference: z
      .object({
        ideationStyle: z.string().nullable(),
        workTime: z.string().nullable(),
        communicationStyle: z.string().nullable(),
        workPlace: z.string().nullable(),
        feedbackStyle: z.string().nullable(),
      })
      .nullable()
      .optional(),
    userFavor: z
      .object({
        isPourSauceLover: z.boolean().nullable(),
        isHardPeachLover: z.boolean().nullable(),
        isMintChocoLover: z.boolean().nullable(),
        isRedBeanFishBreadLover: z.boolean().nullable(),
        isSojuLover: z.boolean().nullable(),
        isRiceTteokLover: z.boolean().nullable(),
      })
      .nullable(),
    selfIntroduction: z.string().nullable(),
    activities: z.array(
      z.object({
        id: z.number().nullable(),
        generation: z.number().nullable(),
        part: z.string().nullable(),
        team: z.string().nullable(),
      }),
    ),
    links: z.array(
      z.object({
        id: z.number().nullable(),
        title: z.string().nullable(),
        url: z.string().nullable(),
      }),
    ),
    careers: z.array(
      z.object({
        id: z.number().nullable(),
        companyName: z.string().nullable(),
        title: z.string().nullable(),
        startDate: z.string().nullable(),
        endDate: z.string().nullable(),
        isCurrent: z.boolean().nullable(),
      }),
    ),
    allowOfficial: z.boolean().nullable(),
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
      queryClient.invalidateQueries({ queryKey: ['getMemberOfMe'] });
      queryClient.invalidateQueries({ queryKey: ['getMembersCoffeeChat'] });
    },
  });
};
