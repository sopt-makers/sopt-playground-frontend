import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useCallback } from 'react';

import { ResolutionRequestBody, usePostResolutionMutation } from '@/api/endpoint/resolution/postResolution';
import useConfirm from '@/components/common/Modal/useConfirm';
import useToast from '@/components/common/Toast/useToast';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { zIndex } from '@/styles/zIndex';

interface Options extends ResolutionRequestBody {
  onSuccess?: () => void;
}

export const useConfirmResolution = () => {
  const { confirm } = useConfirm();
  const { mutateAsync, isPending } = usePostResolutionMutation();
  const toast = useToast();
  const { logSubmitEvent } = useEventLogger();
  const router = useRouter();

  const handleConfirmResolution = useCallback(
    async (options: Options) => {
      const result = await confirm({
        title: '다짐을 보내시겠습니까?',
        description: '한번 보낸 다짐은 수정할 수 없고, 종무식 때 다시 열어볼 수 있어요. 신중히 다짐해 주세요!',
        okButtonText: '보내기',
        cancelButtonText: '취소',
        maxWidth: 400,
        zIndex: zIndex.헤더 + 101,
        okButtonColor: 'linear-gradient(90deg, #effdb4 0%, #bdec00 100%)',
        okButtonTextColor: colors.black,
      });

      if (result) {
        mutateAsync(options, {
          onSuccess: async () => {
            logSubmitEvent('postResolution');
            toast.show({ message: '💌 전송이 완료되었어요. 종무식 때 만나요!' });
            options.onSuccess?.();
            await router.push(playgroundLink.feedList());
          },
        });
      }
    },
    [confirm, mutateAsync, toast, logSubmitEvent, router],
  );

  return { handleConfirmResolution, isPending };
};
