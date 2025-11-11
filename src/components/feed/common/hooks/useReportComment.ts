import { useToast } from '@sopt-makers/ui';
import { useCallback } from 'react';

import { usePostReportCommentMutation } from '@/api/endpoint/feed/postReportComment';
import useAlert from '@/components/common/Modal/useAlert';
import useConfirm from '@/components/common/Modal/useConfirm';
import { zIndex } from '@/styles/zIndex';

interface Options {
  postId: string;
  commentId: string;
  onSuccess?: () => void;
}

export const useReportComment = () => {
  const { confirm } = useConfirm();
  const { mutate } = usePostReportCommentMutation();
  const { open } = useToast();

  const handleReport = useCallback(
    async (options: Options) => {
      const result = await confirm({
        title: '이 댓글을 신고하시겠습니까?',
        description: '댓글을 신고할 경우, 메이커스에서 검토를 거쳐 적절한 조치 및 게시자 제재를 취해요.',
        okButtonText: '신고하기',
        cancelButtonText: '취소',
        zIndex: zIndex.헤더,
      });

      if (result) {
        mutate(
          { commentId: options.commentId, postId: options.postId },
          {
            onSuccess: () => {
              open({
                icon: 'success',
                content: '신고가 완료되었어요.\n건전한 커뮤니티를 함께 만들어주셔서 감사해요!',
                style: {
                  content: {
                    whiteSpace: 'pre-wrap',
                  },
                },
              });

              options.onSuccess?.();
            },
          },
        );
      }
    },
    [confirm, mutate, open],
  );

  return { handleReport };
};
