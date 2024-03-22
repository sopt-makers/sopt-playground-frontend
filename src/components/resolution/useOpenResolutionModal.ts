import { colors } from '@sopt-makers/colors';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetResolutionValidation } from '@/api/endpoint/resolution/getResolutionValidation';
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

  const { data: { profileImage } = {} } = useGetMemberOfMe();

  const handleResolutionModalOpen = () => {
    if (isRegistration) {
      alert({
        title: '편지는 한번만 전송할 수 있어요',
        description: '전송된 편지는 종무식 때 열어볼 수 있어요!',
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
    profileImage,
  };
};
