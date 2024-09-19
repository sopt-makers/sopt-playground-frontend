import { useDialog, useToast } from '@sopt-makers/ui';
import { useCallback } from 'react';

import { usePostReportPostMutation } from '@/api/endpoint/feed/postReportPost';

interface Options {
  postId: string;
  onSuccess?: () => void;
}

export const useReportFeed = () => {
  const { mutate } = usePostReportPostMutation();
  const { open } = useToast();
  const { open: confirm } = useDialog();

  const handleReport = useCallback(
    (options: Options) => {
      confirm({
        title: '이 글을 신고하시겠습니까?',
        description: '글을 신고할 경우, 메이커스에서 검토를 거쳐 적절한 조치 및 게시자 제재를 취할 예정이에요.',
        type: 'default',
        typeOptions: {
          cancelButtonText: '취소',
          approveButtonText: '확인',
          buttonFunction: () => {
            console.log('inside buttonFunction');

            mutate(options.postId, {
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
            });
          },
        },
      });
    },
    [confirm, open, mutate],
  );

  return { handleReport };
};
