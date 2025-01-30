import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button, useToast } from '@sopt-makers/ui';

import { useGetResolutionValidation } from '@/api/endpoint/resolution/getResolutionValidation';
import Modal, { ModalProps } from '@/components/common/Modal';
import { ModalContent, ModalFooter } from '@/components/common/Modal/parts';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import useImageDownload from '@/components/resolution/read/hooks/useImageDownload';
import ResolutionMessage from '@/components/resolution/read/ResolutionMessage';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

const ResolutionReadModal = ({ ...props }: ModalProps) => {
  const { ref: imageRef, onClick: onDownloadButtonClick } = useImageDownload('and-sopt-다짐메시지');
  const { open } = useToast();

  const { data: { isRegistration } = {} } = useGetResolutionValidation();

  const handleClickDownloadButton = () => {
    onDownloadButtonClick();
    props.onClose();
    open({
      icon: 'success',
      content: '이미지가 저장되었어요. 친구와 공유해보세요!',
      style: {
        content: {
          whiteSpace: 'pre-wrap',
        },
      },
    });
  };

  return (
    <StyledModal isOpen {...props} zIndex={zIndex.헤더 + 100}>
      <StyledModalContent ref={imageRef}>
        <ResolutionMessage isMessageExist={isRegistration ?? false} />
      </StyledModalContent>
      <StyledModalFooter align='stretch'>
        <LoggingClick eventKey='saveResolutionImage'>
          <StyledButton size='md' onClick={handleClickDownloadButton}>
            이미지로 저장하기
          </StyledButton>
        </LoggingClick>
      </StyledModalFooter>
    </StyledModal>
  );
};

export default ResolutionReadModal;

const StyledModal = styled(Modal)`
  background-color: ${colors.gray900};
  padding: 48px 0 40px;
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
  margin-top: 12px;
  padding: 0 24px;
`;

const StyledButton = styled(Button)`
  justify-self: center;
  width: fit-content;
`;
