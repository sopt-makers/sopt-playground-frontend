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

  const { data: { isRegistration } = {} } = useGetResolutionValidation();

  const { data: { name } = {} } = useGetMemberProfileOfMe();

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
  };
};
