import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

const PostSchema = z.object({
  anonymousProfile: z
    .object({
      nickname: z.string(),
      profileImgUrl: z.string(),
    })
    .nullable(),
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
    sopticleUrl: z.string().nullable(),
  }),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  isMine: z.boolean(),
  isLiked: z.boolean(),
  likes: z.number(),
});

export const getPost = createEndpoint({
  request: (postId: string) => ({
    method: 'GET',
    url: `api/v1/community/posts/${postId}`,
  }),
  serverResponseScheme: PostSchema,
});

export type PostType = z.infer<typeof PostSchema>;

export const useGetPostQuery = (postId: string | undefined) => {
  const id = postId ?? '';

  return useQuery({
    queryKey: getPost.cacheKey(id),
    queryFn: () => getPost.request(id),
    enabled: !!postId,
  });
};
