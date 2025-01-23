import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';

import { useGetResolutionValidation } from '@/api/endpoint/resolution/getResolutionValidation';
import Modal, { ModalProps } from '@/components/common/Modal';
import { ModalContent, ModalFooter } from '@/components/common/Modal/parts';
import useSlideUp from '@/components/common/SlideUp/useToast';
import useImageDownload from '@/components/resolution/read/hooks/useImageDownload';
import ResolutionMessage from '@/components/resolution/read/ResolutionMessage';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

const ResolutionReadModal = ({ ...props }: ModalProps) => {
  const { ref: imageRef, onClick: onDownloadButtonClick } = useImageDownload('and-sopt');
  const slideUp = useSlideUp();
  const router = useRouter();

  const { data } = useGetResolutionValidation();

  const handleClickDownloadButton = () => {
    onDownloadButtonClick();
    props.onClose();
    slideUp.show({
      message: '이미지가 저장되었어요.',
      buttonText: '활동 후기 작성하기',
      action: () => {
        router.push(playgroundLink.remember());
      },
      status: 'success',
    });
  };

  return (
    <StyledModal isOpen {...props} zIndex={zIndex.헤더 + 100}>
      <StyledModalContent ref={imageRef}>
        <ResolutionMessage isMessageExist={data?.isRegistration ?? false} />
      </StyledModalContent>
      <StyledModalFooter align='stretch'>
        <StyledButton size='md' onClick={handleClickDownloadButton}>
          이미지로 저장하기
        </StyledButton>
      </StyledModalFooter>
    </StyledModal>
  );
};

export default ResolutionReadModal;

const StyledModal = styled(Modal)`
  background-color: ${colors.gray900};
  padding: 64px 0 40px;
  max-height: 100vh;
  overflow-y: auto;

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }
`;

const StyledModalContent = styled(ModalContent)`
  align-items: center;
`;

const StyledModalFooter = styled(ModalFooter)`
  margin-top: 11px;
  padding: 0 24px;
`;

const StyledButton = styled(Button)`
  justify-self: center;
  width: fit-content;
`;
