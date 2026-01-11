import { useToast } from '@sopt-makers/ui';
import { useCallback } from 'react';

import { usePostQuestionReport } from '@/api/endpoint/members/postQuestionReport';
import useConfirm from '@/components/common/Modal/useConfirm';
import { zIndex } from '@/styles/zIndex';

interface Options {
  questionId: number;
  onSuccess?: () => void;
}

interface UseReportQuestionReturn {
  handleReportQuestion: (options: Options) => Promise<void>;
}

export const useReportQuestion = (): UseReportQuestionReturn => {
  const { confirm } = useConfirm();
  const { mutate } = usePostQuestionReport();
  const { open } = useToast();

  const handleReportQuestion = useCallback(
    async (options: Options) => {
      const result = await confirm({
        title: '이 질문을 신고하시겠습니까?',
        description: '질문을 신고할 경우, 메이커스에서 검토를 거쳐 적절한 조치 및 게시자 제재를 취할 예정이에요.',
        okButtonText: '신고하기',
        cancelButtonText: '취소',
        maxWidth: 400,
        zIndex: zIndex.헤더,
      });

      if (result) {
        mutate(
          { questionId: options.questionId, reason: '부적절한 내용' },
          {
            onSuccess: () => {
              open({
                icon: 'success',
                content: '신고가 완료되었어요.\n건전한 커뮤니티를 함께 만들어주셔서 감사해요!',
                style: { content: { whiteSpace: 'pre-wrap' } },
              });
              options.onSuccess?.();
            },
          },
        );
      }
    },
    [confirm, open, mutate],
  );

  return { handleReportQuestion };
};
