import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

// 공통 필드
const baseFields = {
  id: z.number(),
  parentCommentId: z.number().nullable(),
  postId: z.number(),
};

// 삭제되지 않은 댓글 스키마
const activeCommentSchema = z
  .object({
    ...baseFields,
    isDeleted: z.literal(false),

    member: z
      .object({
        id: z.number(),
        name: z.string(),
        profileImage: z.string().nullable(),
        activity: z.object({
          part: z.string(),
          generation: z.number(),
          team: z.string().nullable(),
        }),
        careers: z
          .object({
            companyName: z.string(),
            title: z.string(),
          })
          .nullable(),
      })
      .nullable(),

    content: z.string(),
    isBlindWriter: z.boolean(),
    anonymousProfile: z
      .object({
        nickname: z.string(),
        profileImgUrl: z.string(),
      })
      .nullable(),
    isReported: z.boolean().nullable(),
    isMine: z.boolean(),
    createdAt: z.string(),
    likeCount: z.number(),
    isLiked: z.boolean(),
  })
  .strict();

// 삭제된 댓글 스키마
const deletedCommentSchema = z
  .object({
    ...baseFields,
    isDeleted: z.literal(true),

    member: z.null(),
    content: z.null(),
    isBlindWriter: z.null(),
    anonymousProfile: z.null(),
    isReported: z.null(),
    isMine: z.null(),
    createdAt: z.null(),
    likeCount: z.null(),
    isLiked: z.null(),
  })
  .strict();

export const commentSchema = z.union([activeCommentSchema, deletedCommentSchema]);

export const activeCommentSchemaWithReplies = activeCommentSchema.extend({
  replies: z.lazy(() => commentSchema.array()),
});

const deletedCommentSchemaWithReplies = deletedCommentSchema.extend({
  replies: z.lazy(() => commentSchema.array()),
});

export type CommentWithReplies =
  | z.infer<typeof activeCommentSchemaWithReplies>
  | z.infer<typeof deletedCommentSchemaWithReplies>;

//✅ 재귀: isDeleted 기준 union에 replies 추가
export const recursiveCommentSchema: z.ZodType<CommentWithReplies> = z.lazy(() =>
  z.discriminatedUnion('isDeleted', [
    activeCommentSchema.extend({
      replies: z.array(recursiveCommentSchema),
    }),
    deletedCommentSchema.extend({
      replies: z.array(recursiveCommentSchema),
    }),
  ]),
);

export const getComment = createEndpoint({
  request: (postId: string) => ({
    method: 'GET',
    url: `/api/v1/community/${postId}/comment`,
  }),
  serverResponseScheme: z.array(recursiveCommentSchema),
});

export const useGetCommentQuery = (postId: string) => {
  return useQuery({
    queryKey: getComment.cacheKey(postId),
    queryFn: () => getComment.request(postId),
  });
};
