import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';

import Modal from '@/components/common/Modal';
import { ModalButton, ModalContent, ModalFooter } from '@/components/common/Modal/parts';
import Responsive from '@/components/common/Responsive';
import useSlideUp from '@/components/common/SlideUp/useToast';
import Text from '@/components/common/Text';
import { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import useImageDownload from '@/components/resolution/read/hooks/useImageDownload';
import ResolutionMessage from '@/components/resolution/read/ResolutionMessage';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

const ResolutionReadModal: FC<ModalProps> = ({ ...props }) => {
  const { ref: imageRef, onClick: onDownloadButtonClick } = useImageDownload('now-sopt');
  const slideUp = useSlideUp();
  const router = useRouter();

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
        <ResolutionMessage />
      </StyledModalContent>
      <Responsive only='mobile'>
        <SubTextWrapper>
          <Text typography='SUIT_12_M' color={colors.gray200}>
            *이미지 저장은 모바일 웹에서 가능해요
          </Text>
        </SubTextWrapper>
      </Responsive>
      <StyledModalFooter align='stretch'>
        <ModalButton onClick={handleClickDownloadButton}>이미지로 저장하기</ModalButton>
        <ModalButton background='light' onClick={() => router.push(playgroundLink.remember())}>
          활동 후기 작성하기
        </ModalButton>
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

const SubTextWrapper = styled.div`
  margin-top: -12px;
  width: 100%;
  text-align: center;
`;
