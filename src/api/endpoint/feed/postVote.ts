import { InfiniteData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { z } from 'zod';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { getPost, PostType } from '@/api/endpoint/feed/getPost';
import { PostsType, useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import { getRecentPosts } from '@/api/endpoint/feed/getRecentPosts';
import { createEndpoint } from '@/api/typedAxios';
import { getParentCategoryId } from '@/components/feed/common/utils';

const OptionSchema = z.object({
  selectedOptions: z.array(z.number().int()).min(1).max(5),
});

const VoteResponseSchema = z.object({
  id: z.number(),
  isMultiple: z.boolean(),
  hasVoted: z.boolean(),
  totalParticipants: z.number(),
  options: z.array(
    z.object({
      id: z.number(),
      content: z.string(),
      voteCount: z.number(),
      votePercent: z.number(),
      isSelected: z.boolean(),
    }),
  ),
});

export const postVote = createEndpoint({
  request: (postId: number, requestBody: z.infer<typeof OptionSchema>) => ({
    method: 'POST',
    url: `api/v1/community/posts/${postId}/vote`,
    data: requestBody,
  }),
  serverResponseScheme: VoteResponseSchema,
});

export const usePostVoteMutation = (postId: number, categoryId: number) => {
  const queryClient = useQueryClient();

  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });
  const parentCategoryId = getParentCategoryId(categoryData, categoryId) || categoryId;

  return useMutation({
    mutationFn: (requestBody: z.infer<typeof OptionSchema>) => postVote.request(postId, requestBody),
    onSuccess: (data: z.infer<typeof VoteResponseSchema>) => {
      queryClient.setQueryData(getPost.cacheKey(String(postId)), (oldData: PostType) => {
        return produce(oldData, (draft) => {
          if (draft && draft.posts) {
            draft.posts.vote = data;
          }
        });
      });
      queryClient.setQueryData(
        useGetPostsInfiniteQuery.getKey(parentCategoryId?.toString()),
        (oldData: InfiniteData<PostsType>) => {
          return produce(oldData, (draft) => {
            if (draft && draft.pages) {
              draft.pages.forEach((page) => {
                const post = page.posts.find((p) => p.id === postId);
                if (post) {
                  post.vote = data;
                }
              });
            }
          });
        },
      );
      queryClient.invalidateQueries({ queryKey: getRecentPosts.cacheKey() });
    },
  });
};
