import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { axiosCrewInstance } from '@/api';
import { createEndpoint } from '@/api/typedAxios';

export interface GroupFeedParams {
  contents: string;
  images: string[];
  title: string;
  meetingId: number;
}

export interface PostGroupFeedResponse {
  postId: number;
}

export const PostGroupFeedResponseSchema = z.object({
  postId: z.number(),
});

export const postGroupFeed = createEndpoint({
  request: (orgId: number, requestBody: GroupFeedParams) => ({
    method: 'POST',
    url: `internal/post/${orgId}`,
    data: requestBody,
  }),
  serverResponseScheme: PostGroupFeedResponseSchema,
  externalInstance: axiosCrewInstance,
});

export const usePostGroupFeed = (orgId: number) => {
  return useMutation<PostGroupFeedResponse, Error, GroupFeedParams>({
    mutationFn: (requestBody: GroupFeedParams) => postGroupFeed.request(orgId, requestBody),
    onError: () => {
      alert('피드 작성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
};
