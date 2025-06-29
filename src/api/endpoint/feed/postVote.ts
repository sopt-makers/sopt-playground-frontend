import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { getWaitingQuestions } from '@/api/endpoint/feed/getWaitingQuestions';
import { createEndpoint } from '@/api/typedAxios';
import { getPost } from '@/api/endpoint/feed/getPost';
import { getParentCategoryId } from '@/components/feed/common/utils';
import { getCategory } from '@/api/endpoint/feed/getCategory';

const OptionSchema = z.object({
  selectedOptions: z.array(z.number().int()).min(1).max(5),
});

export const postVote = createEndpoint({
  request: (postId: number, reqeustBody: z.infer<typeof OptionSchema>) => ({
    method: 'POST',
    url: `api/v1/community/posts/${postId}/vote`,
    data: reqeustBody,
  }),
  serverResponseScheme: z.record(z.boolean()),
});

export const usePostVoteMutation = (
  postId: number,
  categoryId: number,
  options?: {
    onSuccess?: () => void;
  },
) => {
  const queryClient = useQueryClient();

  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });
  const parentCategoryId = getParentCategoryId(categoryData, categoryId);

  return useMutation({
    mutationFn: (requestBody: z.infer<typeof OptionSchema>) => postVote.request(postId, requestBody),
    onSuccess: () => {
      options?.onSuccess?.();
      console.log(useGetPostsInfiniteQuery.getKey(parentCategoryId?.toString()));
      queryClient.refetchQueries({ queryKey: getPost.cacheKey(String(postId)) });
      queryClient.refetchQueries({ queryKey: useGetPostsInfiniteQuery.getKey(parentCategoryId?.toString()) });
      queryClient.refetchQueries({ queryKey: getWaitingQuestions.cacheKey() });
    },
  });
};
