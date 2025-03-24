import { useCallback } from 'react';

import { ResolutionRequestBody, usePostResolutionMutation } from '@/api/endpoint/resolution/postResolution';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';

interface Options extends ResolutionRequestBody {
  onSuccess?: (isAlreadyRegistration: boolean) => void;
}

export const useConfirmResolution = () => {
  const { mutateAsync, isPending } = usePostResolutionMutation();
  const { logSubmitEvent } = useEventLogger();

  const handleConfirmResolution = useCallback(
    async (options: Options) => {
      mutateAsync(options, {
        onSuccess: async () => {
          logSubmitEvent('postResolution');
          options.onSuccess?.(false);
        },
      });
    },
    [mutateAsync, logSubmitEvent],
  );

  return { handleConfirmResolution, isPending };
};
