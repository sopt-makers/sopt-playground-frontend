import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { createEndpoint } from '@/api/typedAxios';

interface RequestBody {
  content: string;
  isBlindWriter: boolean;
  isChildComment: boolean;
  parentCommentId: number;
}

export const postComment = createEndpoint({
  request: (postId: number, reqeustBody: RequestBody) => ({
    method: 'POST',
    url: `api/v1/coummunity/posts/${postId}/comment`,
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const usePostCommentMutation = (postId: number) => {
  return useMutation({
    mutationFn: async (reqeustBody: RequestBody) => {
      const data = await postComment.request(postId, reqeustBody);
      return data;
    },
  });
};
