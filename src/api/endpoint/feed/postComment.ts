import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

interface RequestBody {
  content: string;
  isBlindWriter: boolean;
  isChildComment: boolean;
  parentCommentId?: number;
  // webLink를 넣어서 보낼 경우만 푸시 알림
  webLink?: string;
}

export const postComment = createEndpoint({
  request: (postId: string, reqeustBody: RequestBody) => ({
    method: 'POST',
    url: `api/v1/community/${postId}/comment`,
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostCommentMutation = (postId: string) => {
  return useMutation({
    mutationFn: (reqeustBody: RequestBody) => postComment.request(postId, reqeustBody),
  });
};
