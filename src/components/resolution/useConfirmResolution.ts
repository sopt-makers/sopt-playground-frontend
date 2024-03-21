import { colors } from '@sopt-makers/colors';
import { useCallback } from 'react';

import { ResolutionRequestBody } from '@/api/endpoint/resolution/postResolution';
import { usePostResolutionMutation } from '@/api/endpoint/resolution/postResolution';
import useConfirm from '@/components/common/Modal/useConfirm';
import useToast from '@/components/common/Toast/useToast';
import { zIndex } from '@/styles/zIndex';

interface Options extends ResolutionRequestBody {
  onSuccess?: () => void;
}

export const useConfirmResolution = () => {
  const { confirm } = useConfirm();
  const { mutateAsync, isPending } = usePostResolutionMutation();
  const toast = useToast();

  const handleConfirmResolution = useCallback(
    async (options: Options) => {
      const result = await confirm({
        title: '전송 후, 편지는 수정이 불가능해요!',
        description: '한번 작성한 편지는 수정할 수 없고, 종무식 때 다시 열어볼 수 있어요. 신중히 전송해주세요!',
        okButtonText: '그대로 전송하기',
        cancelButtonText: '취소',
        maxWidth: 400,
        zIndex: zIndex.헤더,
        okButtonColor: 'linear-gradient(90deg, #effdb4 0%, #bdec00 100%)',
        okButtonTextColor: colors.black,
      });

      if (result) {
        mutateAsync(options, {
          onSuccess: () => {
            toast.show({ message: '💌 전송이 완료되었어요. 종무식 때 만나요!' });
            options.onSuccess?.();
          },
        });
      }
    },
    [confirm, mutateAsync, toast],
  );

  return { handleConfirmResolution, isPending };
};
