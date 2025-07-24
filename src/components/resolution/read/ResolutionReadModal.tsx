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
import { useGetResolution } from '@/api/endpoint/resolution/getResolution';

const ResolutionReadModal = ({ isOpen, onClose }: ModalProps) => {
  const { ref: imageRef, onClick: onDownloadButtonClick } = useImageDownload('at-sopt-다짐메시지');
  const { open } = useToast();

  const { data: { isRegistration } = {} } = useGetResolutionValidation();
  const { data: resolutionData } = useGetResolution(isRegistration ?? false);

  const handleClickDownloadButton = () => {
    onDownloadButtonClick();
    onClose();
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
    <StyledModal isOpen={isOpen} onClose={onClose} zIndex={zIndex.헤더 + 100}>
      <StyledModalContent ref={imageRef}>
        <ResolutionMessage isMessageExist={isRegistration ?? false} />
      </StyledModalContent>
      <StyledModalFooter align='stretch'>
        <LoggingClick eventKey='saveResolutionImage'>
          <Button size='md' theme='black' onClick={handleClickDownloadButton}>
            이미지로 저장하기
          </Button>
        </LoggingClick>
        <LoggingClick eventKey='saveResolutionImage'>
          <Button size='md' onClick={handleClickDownloadButton} disabled={resolutionData?.hasDrawnLuckyPick}>
            행운의 타임캡솝 뽑기
          </Button>
        </LoggingClick>
      </StyledModalFooter>
    </StyledModal>
  );
};

export default ResolutionReadModal;

const StyledModal = styled(Modal)`
  background-color: ${colors.gray900};
  padding: 48px 0 20px;
  width: 375px;
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
  justify-content: center;
  margin-top: 20px;
  padding: 0 20px;
`;

const StyledModalFooter = styled(ModalFooter)`
  display: flex;
  gap: 7px;
  margin-top: 20px;
  padding: 0 24px;
  width: 100%;

  button {
    flex: 1 1 0;
    height: 44px;
    font-size: 14px;
  }
`;
