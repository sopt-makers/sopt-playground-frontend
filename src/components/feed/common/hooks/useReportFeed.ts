import { useCallback } from 'react';

import { usePostReportPostMutation } from '@/api/endpoint/feed/postReportPost';
import useAlert from '@/components/common/Modal/useAlert';
import useConfirm from '@/components/common/Modal/useConfirm';

interface Options {
  postId: string;
  onSuccess?: () => void;
}

export const useReportFeed = () => {
  const { confirm } = useConfirm();
  const { alert } = useAlert();
  const { mutate } = usePostReportPostMutation();

  const handleReport = useCallback(
    async (options: Options) => {
      const result = await confirm({
        title: '이 글을 신고하시겠습니까?',
        description: '글을 신고할 경우, 메이커스에서 검토를 거쳐 적절한 조치 및 게시자 제재를 취해요.',
        okButtonText: '신고하기',
        cancelButtonText: '취소',
        maxWidth: 324,
      });

      if (result) {
        mutate(options.postId, {
          onSuccess: () => {
            alert({
              title: '신고해주셔서 감사해요',
              description:
                '메이커스에서 빠르게 검토 후 적절한 조치를 취할게요 :) 건전한 커뮤니티를 만드는데 기여해주셔서 감사해요!',
            });
            options.onSuccess?.();
          },
        });
      }
    },
    [confirm, alert, mutate],
  );

  return { handleReport };
};
