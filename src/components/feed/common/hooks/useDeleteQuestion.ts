import { colors } from '@sopt-makers/colors';

import { useDeleteMemberQuestion } from '@/api/endpoint/members/deleteMemberQuestion';
import useConfirm from '@/components/common/Modal/useConfirm';
import useToast from '@/components/common/Toast/useToast';
import { zIndex } from '@/styles/zIndex';

interface Options {
  questionId: number;
  onSuccess?: () => void;
}

export const useDeleteQuestion = () => {
  const toast = useToast();
  const { mutate } = useDeleteMemberQuestion();
  const { confirm } = useConfirm();

  const handleDeleteQuestion = async (options: Options) => {
    const result = await confirm({
      title: '글을 정말 삭제하시겠어요?',
      description: '유익한 정보를 담고 있다면, 글을 남겨 다른 사람들과도 공유해보세요.',
      okButtonColor: colors.error,
      okButtonTextColor: colors.white,
      okButtonText: '삭제하기',
      cancelButtonText: '취소',
      maxWidth: 324,
      zIndex: zIndex.헤더,
    });

    if (result) {
      mutate(options.questionId, {
        onSuccess: () => {
          options.onSuccess?.();
          toast.show({
            message: '글이 성공적으로 삭제되었어요.',
          });
        },
      });
    }
  };

  return { handleDeleteQuestion };
};
