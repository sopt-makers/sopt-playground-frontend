import { colors } from '@sopt-makers/colors';

import { useGetResolutionValidation } from '@/api/endpoint/resolution/getResolutionValidation';
import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import useAlert from '@/components/common/Modal/useAlert';
import useModalState from '@/components/common/Modal/useModalState';
import { zIndex } from '@/styles/zIndex';

export const useOpenResolutionModal = () => {
  const {
    isOpen: isOpenResolutionModal,
    onOpen: onOpenResolutionModal,
    onClose: onCloseResolutionModal,
  } = useModalState();

  const { alert } = useAlert();
  const { data: { isRegistration } = {} } = useGetResolutionValidation();

  const { data: { name } = {} } = useGetMemberProfileOfMe();

  const handleResolutionModalOpen = () => {
    if (isRegistration) {
      alert({
        title: '다짐은 한번만 보낼 수 있어요',
        description: '보내주신 다짐은 종무식 때 전달드릴게요!',
        buttonText: '확인',
        maxWidth: 400,
        zIndex: zIndex.헤더 + 101,
        buttonColor: colors.white,
        buttonTextColor: colors.black,
        hideCloseButton: true,
      });
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
  };
};
