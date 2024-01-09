import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { z } from 'zod';

import { getPost } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { createEndpoint } from '@/api/typedAxios';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';

interface RequestBody {
  postId: number;
  categoryId: number;
  title: string | null;
  content: string;
  isQuestion: boolean;
  isBlindWriter: boolean;
  images: string[];
}

export const editFeed = createEndpoint({
  request: (reqeustBody: RequestBody) => ({
    method: 'PUT',
    url: 'api/v1/community/posts',
    data: reqeustBody,
  }),
  serverResponseScheme: z.unknown(),
});

export const useSaveEditFeedData = (feedId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logSubmitEvent } = useEventLogger();

  return useMutation({
    mutationFn: (reqeustBody: RequestBody) => editFeed.request(reqeustBody),
    onSuccess: async () => {
      logSubmitEvent('editCommunity');
      queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey('') });
      queryClient.invalidateQueries({ queryKey: getPost.cacheKey(feedId) });
      await router.push(playgroundLink.feedList());
    },
  });
};
