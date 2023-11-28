import { colors } from '@sopt-makers/colors';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useDeleteCommentMutation } from '@/api/endpoint/feed/deleteComment';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import useConfirm from '@/components/common/Modal/useConfirm';
import { zIndex } from '@/styles/zIndex';

interface Options {
  commentId: string;
  onSuccess?: () => void;
}

export const useDeleteComment = () => {
  const { mutate } = useDeleteCommentMutation();
  const { confirm } = useConfirm();
  const queryClient = useQueryClient();

  const handleDeleteComment = useCallback(
    async (options: Options) => {
      const result = await confirm({
        title: '댓글을 정말 삭제하시겠어요?',
        description: '유익한 정보를 담고 있다면, 글을 남겨 다른 사람들과도 공유해보세요.',
        okButtonColor: colors.error,
        okButtonTextColor: colors.white,
        okButtonText: '삭제하기',
        cancelButtonText: '취소',
        zIndex: zIndex.헤더,
        maxWidth: 324,
      });

      if (result) {
        mutate(options.commentId, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey('') });
            options.onSuccess?.();
          },
        });
      }
    },
    [confirm, mutate],
  );

  return { handleDeleteComment };
};
