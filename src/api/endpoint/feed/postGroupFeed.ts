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

export const postGroupFeed = createEndpoint({
  request: (orgId: number, reqeustBody: GroupFeedParams) => ({
    method: 'POST',
    url: `internal/post/${orgId}`,
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
  externalInstance: axiosCrewInstance,
});

export const usePostGroupFeed = (orgId: number) => {
  return useMutation({
    mutationFn: (reqeustBody: GroupFeedParams) => postGroupFeed.request(orgId, reqeustBody),
    onSuccess: () => {},
  });
};
