import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getPost = createEndpoint({
  request: (postId: number) => ({
    method: 'GET',
    url: `api/v1/community/posts/${postId}`,
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
        team: z.string().nullable(),
      }),
      careers: z
        .object({
          id: z.number(),
          memberId: z.number(),
          companyName: z.string(),
          title: z.string(),
          startDate: z.string(),
          endDate: z.string(),
          isCurrent: z.boolean(),
        })
        .nullable(),
    }),
    posts: z.object({
      id: z.number(),
      member: z.object({
        id: z.number(),
        authUserId: z.string(),
        idpType: z.string().nullable(),
        name: z.string(),
        email: z.string(),
        generation: z.number(),
        profileImage: z.string().nullable(),
        activities: z.array(
          z.object({
            id: z.number(),
            memberId: z.number(),
            part: z.string(),
            generation: z.number(),
            team: z.string().nullable(),
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
      updatedAt: z.string().nullable(),
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
    queryFn: () => getPost.request(postId),
  });
};
