import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { z } from 'zod';

import { PostType } from '@/api/endpoint/feed/getPost';
import { PostsType } from '@/api/endpoint/feed/getPosts';
import { createEndpoint } from '@/api/typedAxios';

export const postLike = createEndpoint({
  request: (postId: number) => ({
    method: 'POST',
    url: `api/v1/community/posts/like/${postId}`,
  }),
  serverResponseScheme: z.unknown(),
});

export const postUnlike = createEndpoint({
  request: (postId: number) => ({
    method: 'DELETE',
    url: `api/v1/community/posts/unlike/${postId}`,
  }),
  serverResponseScheme: z.unknown(),
});

interface usePostMutationParams {
  action: 'like' | 'unlike';
  postId: number;
  allPostsQueryKey: (string | Params | undefined)[];
  postsQueryKey: (string | Params | undefined)[];
  postQueryKey: string[];
  recentPostsQuerykey: string[];
}

export const useToggleLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, action }: usePostMutationParams): Promise<unknown> => {
      const endpoint = action === 'like' ? postLike : postUnlike;
      return endpoint.request(postId);
    },
    onMutate: async ({ postId, allPostsQueryKey, postsQueryKey, postQueryKey, recentPostsQuerykey }) => {
      await queryClient.cancelQueries({ queryKey: allPostsQueryKey });
      await queryClient.cancelQueries({ queryKey: postsQueryKey });
      await queryClient.cancelQueries({ queryKey: postQueryKey });
      await queryClient.cancelQueries({ queryKey: recentPostsQuerykey });

      const previousAllPostsData = queryClient.getQueryData<{ pages: PostsType[] }>(allPostsQueryKey);
      const previousPostsData = queryClient.getQueryData<{ pages: PostsType[] }>(postsQueryKey);
      const previousPostData = queryClient.getQueryData<PostType>(postQueryKey);

      queryClient.setQueryData<PostType>(postQueryKey, (oldData) => {
        return produce(oldData, (draft) => {
          if (draft) {
            draft.likes = draft.isLiked ? draft.likes - 1 : draft.likes + 1;
            draft.isLiked = !draft.isLiked;
          }
        });
      });

      queryClient.setQueryData<{ pages: PostsType[] }>(postsQueryKey, (oldData) => {
        return produce(oldData, (draft) => {
          if (draft) {
            draft.pages.forEach((page) => {
              page.posts.forEach((post) => {
                if (post.id === postId) {
                  post.likes = post.isLiked ? post.likes - 1 : post.likes + 1;
                  post.isLiked = !post.isLiked;
                }
              });
            });
          }
        });
      });

      queryClient.setQueryData<{ pages: PostsType[] }>(allPostsQueryKey, (oldData) => {
        return produce(oldData, (draft) => {
          if (draft) {
            draft.pages.forEach((page) => {
              page.posts.forEach((post) => {
                if (post.id === postId) {
                  post.likes = post.isLiked ? post.likes - 1 : post.likes + 1;
                  post.isLiked = !post.isLiked;
                }
              });
            });
          }
        });
      });

      return { previousAllPostsData, previousPostsData, previousPostData };
    },
    onSuccess: (_, { allPostsQueryKey, postsQueryKey, postQueryKey, recentPostsQuerykey }) => {
      queryClient.invalidateQueries({ queryKey: allPostsQueryKey });
      queryClient.invalidateQueries({ queryKey: postQueryKey });
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
      queryClient.invalidateQueries({ queryKey: recentPostsQuerykey });
    },
  });
};
