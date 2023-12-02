import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { z } from 'zod';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { createEndpoint } from '@/api/typedAxios';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';

interface RequestBody {
  categoryId: number;
  title: string | null;
  content: string;
  isQuestion: boolean;
  isBlindWriter: boolean;
  images: string[];
}

export const uploadFeed = createEndpoint({
  request: (reqeustBody: RequestBody) => ({
    method: 'POST',
    url: 'api/v1/community/posts',
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const useSaveUploadFeedData = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logSubmitEvent } = useEventLogger();

  return useMutation({
    mutationFn: (reqeustBody: RequestBody) => uploadFeed.request(reqeustBody),
    onSuccess: async () => {
      logSubmitEvent('submitCommunity');
      queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey('') });
      await router.push(playgroundLink.feedList());
    },
  });
};
