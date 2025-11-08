import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { getRecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import { createEndpoint } from '@/api/typedAxios';

interface RequestBody {
  content: string;
  isBlindWriter: boolean;
  isChildComment: boolean;
  parentCommentId?: number;
  // webLink를 넣어서 보낼 경우만 푸시 알림
  webLink?: string;
  mention: {
    userIds: number[];
    writerName?: string;
    webLink?: string;
  } | null;
  anonymousMention: {
    anonymousNickname: string[];
  } | null;
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reqeustBody: RequestBody) => postComment.request(postId, reqeustBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey('') });
      queryClient.invalidateQueries({ queryKey: getRecentPosts.cacheKey() });
    },
  });
};
