import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

export const getPost = createEndpoint({
  request: (postId: string) => ({
    method: 'GET',
    url: `api/v1/community/posts/${postId}`,
  }),
  serverResponseScheme: z.object({
    member: z
      .object({
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
            endDate: z.string().nullable(),
            isCurrent: z.boolean(),
          })
          .nullable(),
      })
      .nullable(),
    posts: z.object({
      id: z.number(),
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
    }),
    category: z.object({
      id: z.number(),
      name: z.string(),
    }),
    isMine: z.boolean(),
  }),
});

export const useGetPostQuery = (postId: string) => {
  return useQuery({
    queryKey: getPost.cacheKey(postId),
    queryFn: () => getPost.request(postId),
    enabled: !!postId,
  });
};
