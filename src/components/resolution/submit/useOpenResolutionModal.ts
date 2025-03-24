import { useEffect, useRef, useState } from 'react';

import { useGetResolutionValidation } from '@/api/endpoint/resolution/getResolutionValidation';
import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import useModalState from '@/components/common/Modal/useModalState';

export const useOpenResolutionModal = () => {
  const {
    isOpen: isOpenResolutionModal,
    onOpen: onOpenResolutionModal,
    onClose: onCloseResolutionModal,
  } = useModalState();
  const {
    isOpen: isOpenPlaygroundGuideModal,
    onOpen: onOpenPlaygroundGuideModal,
    onClose: onClosePlaygroundGuideModal,
  } = useModalState();

  const { data: { isRegistration } = {}, isLoading } = useGetResolutionValidation();

  const { data: { name } = {} } = useGetMemberProfileOfMe();

  const [isAlreadyRegistration, setIsAlreadyRegistration] = useState<boolean | undefined>();

  useEffect(() => {
    // 로딩이 끝났고, 값이 아직 저장되지 않은 경우에만 저장
    if (!isLoading && isAlreadyRegistration === undefined && typeof isRegistration === 'boolean') {
      setIsAlreadyRegistration(isRegistration);
    }
  }, [isLoading, isRegistration, isAlreadyRegistration]);

  const handleResolutionModalOpen = () => {
    if (isRegistration) {
      onOpenPlaygroundGuideModal();
    } else {
      onOpenResolutionModal();
    }
  };
  return {
    isOpenResolutionModal,
    onCloseResolutionModal,
    handleResolutionModalOpen,
    name,
    isRegistration,
    isOpenPlaygroundGuideModal,
    onClosePlaygroundGuideModal,
    onOpenPlaygroundGuideModal,
    isAlreadyRegistration,
  };
};
