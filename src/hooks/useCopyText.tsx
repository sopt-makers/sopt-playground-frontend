import { useCallback } from 'react';

import useToast from '@/components/common/Toast/useToast';

interface Options {
  successMessage?: string;
  failMessage?: string;
}

export const useCopyText = () => {
  const toast = useToast();
  const copy = useCallback(
    async (text: string, options: Options = {}) => {
      try {
        await navigator.clipboard.writeText(text);
        toast.show({
          message: options.successMessage ?? `${text}가 복사되었어요.`,
        });
      } catch (error) {
        toast.show({
          message: options.failMessage ?? `복사가 실패했어요.\n${error instanceof Error ? error.message : ''}`,
        });
      }
    },
    [toast],
  );

  return { copy };
};
