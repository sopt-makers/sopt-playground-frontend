import { useCallback } from 'react';

import { getResolutionValidation } from '@/api/endpoint/resolution/getResolutionValidation';
import useAlert from '@/components/common/Modal/useAlert';
import { zIndex } from '@/styles/zIndex';

export const useConfirmResolutionValidation = () => {
  const { alert } = useAlert();
  const { memberProfileImgUrl, isRegistration } = getResolutionValidation();

  const handleAlertResolutionValidation = useCallback(() => {
    if (isRegistration) {
      alert({
        title: '편지는 한번만 전송할 수 있어요',
        description: '전송된 편지는 종무식 때 열어볼 수 있어요!',
        buttonText: '확인',
        maxWidth: 400,
        zIndex: zIndex.헤더,
      });
    }
  }, [alert, isRegistration]);

  return { handleAlertResolutionValidation };
};
