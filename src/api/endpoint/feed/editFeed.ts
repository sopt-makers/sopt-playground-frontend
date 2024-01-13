import { useMutation } from '@tanstack/react-query';
// import { playgroundLink } from 'playground-common/export';
import { z } from 'zod';

// import { getPost } from '@/api/endpoint/feed/getPost';
// import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { createEndpoint } from '@/api/typedAxios';

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

export const useSaveEditFeedData = () => {
  return useMutation({
    mutationFn: (reqeustBody: RequestBody) => editFeed.request(reqeustBody),
  });
};
