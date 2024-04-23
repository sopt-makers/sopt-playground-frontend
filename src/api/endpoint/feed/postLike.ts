import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  postId: number;
  allPostsQueryKey: (string | Params | undefined)[];
  postsQueryKey: (string | Params | undefined)[];
  postQueryKey: string[];
}

export const usePostLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: usePostMutationParams) => postLike.request(postId),
    onMutate: async ({ postId, allPostsQueryKey, postsQueryKey, postQueryKey }) => {
      await queryClient.cancelQueries({ queryKey: postsQueryKey });
      await queryClient.cancelQueries({ queryKey: postQueryKey });

      const previousAllPostsData = queryClient.getQueryData<{ pages: PostsType[] }>(allPostsQueryKey);
      const previousPostsData = queryClient.getQueryData<{ pages: PostsType[] }>(postsQueryKey);
      const previousPostData = queryClient.getQueryData<PostType>(postQueryKey);

      queryClient.setQueryData<PostType[]>(postQueryKey, (oldData) => {
        if (!oldData) {
          return oldData;
        }

        return {
          ...oldData,
          isLiked: true,
        };
      });

      queryClient.setQueryData<{ pages: PostsType[] }>(postsQueryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) => (post.id === postId ? { ...post, isLiked: !post.isLiked } : post)),
          })),
        };
      });

      queryClient.setQueryData<{ pages: PostsType[] }>(allPostsQueryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) => (post.id === postId ? { ...post, isLiked: !post.isLiked } : post)),
          })),
        };
      });

      return { previousAllPostsData, previousPostsData, previousPostData };
    },
    onSuccess: (_, { postsQueryKey, postQueryKey }) => {
      queryClient.invalidateQueries({ queryKey: postQueryKey });
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });
};

export const usePostUnlikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: usePostMutationParams) => postUnlike.request(postId),
    onMutate: async ({ postId, allPostsQueryKey, postsQueryKey, postQueryKey }) => {
      await queryClient.cancelQueries({ queryKey: postsQueryKey });
      await queryClient.cancelQueries({ queryKey: postQueryKey });

      const previousAllPostsData = queryClient.getQueryData<{ pages: PostsType[] }>(allPostsQueryKey);
      const previousPostsData = queryClient.getQueryData<{ pages: PostsType[] }>(postsQueryKey);
      const previousPostData = queryClient.getQueryData<PostType>(postQueryKey);

      queryClient.setQueryData<PostType[]>(postQueryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          isLiked: false,
        };
      });

      queryClient.setQueryData<{ pages: PostsType[] }>(postsQueryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) => (post.id === postId ? { ...post, isLiked: !post.isLiked } : post)),
          })),
        };
      });

      queryClient.setQueryData<{ pages: PostsType[] }>(allPostsQueryKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) => (post.id === postId ? { ...post, isLiked: !post.isLiked } : post)),
          })),
        };
      });

      return { previousAllPostsData, previousPostsData, previousPostData };
    },
    onSuccess: (_, { postsQueryKey, postQueryKey }) => {
      queryClient.invalidateQueries({ queryKey: postQueryKey });
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });
};
