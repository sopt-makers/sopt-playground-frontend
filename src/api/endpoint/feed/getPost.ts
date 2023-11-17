import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getPost = createEndpoint({
  request: (postId: number) => ({
    method: 'GET',
    url: `api/v1/coummunity/posts/${postId}`,
  }),
  serverResponseScheme: z.object({
    member: z.object({
      id: z.number(),
      name: z.string(),
      profileImage: z.string().nullable(),
      activity: z.object({
        id: z.number(),
        memberId: z.number(),
        part: z.string(),
        generation: z.number(),
        team: z.string(),
      }),
      careers: z.object({
        id: z.number(),
        memberId: z.number(),
        companyName: z.string(),
        title: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        isCurrent: z.boolean(),
      }),
    }),
    posts: z.object({
      id: z.number(),
      member: z.object({
        id: z.number(),
        authUserId: z.string(),
        idpType: z.string(),
        name: z.string(),
        email: z.string(),
        generation: z.number(),
        profileImage: z.string(),
        birthday: z.string(),
        phone: z.string(),
        address: z.string(),
        university: z.string(),
        major: z.string(),
        introduction: z.string(),
        activities: z.array(
          z.object({
            id: z.number(),
            memberId: z.number(),
            part: z.string(),
            generation: z.number(),

            team: z.string(),
          }),
        ),
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
        links: z.array(
          z.object({
            id: z.number(),
            memberId: z.number(),
            title: z.string(),
            url: z.string(),
          }),
        ),
        careers: z.array(
          z.object({
            id: z.number(),
            memberId: z.number(),
            companyName: z.string(),
            title: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            isCurrent: z.boolean(),
          }),
        ),
        skill: z.string(),
        openToWork: z.boolean(),
        openToSideProject: z.boolean(),
        allowOfficial: z.boolean(),
        hasProfile: z.boolean(),
        editActivitiesAble: z.boolean(),
        openToSoulmate: z.boolean(),
      }),
      categoryId: z.number(),
      title: z.string(),
      content: z.string(),
      hits: z.number(),
      images: z.array(z.string()),
      isQuestion: z.boolean(),
      isBlindWriter: z.boolean(),
      isReported: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
      comments: z.array(
        z.object({
          createdAt: z.string(),
          updatedAt: z.string(),
          id: z.number(),
          content: z.string(),
          postId: z.number(),
          writerId: z.number(),
          parentCommentId: z.number(),
          isBlindWriter: z.boolean(),
          isReported: z.boolean(),
        }),
      ),
    }),
    category: z.object({
      id: z.number(),
      name: z.string(),
    }),
  }),
});

export const useGetPostQuery = (postId: number) => {
  return useQuery({
    queryKey: getPost.cacheKey(postId),
    queryFn: async () => {
      const data = await getPost.request(postId);
      return data;
    },
  });
};
