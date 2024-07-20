import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import Modal from '@/components/common/Modal';
import { ModalButton, ModalContent, ModalFooter } from '@/components/common/Modal/parts';
import { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import ResolutionMessage from '@/components/resolution/read/ResolutionMessage';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

interface ResolutionReadModalProps extends ModalProps {}

const ResolutionReadModal: FC<ResolutionReadModalProps> = ({ ...props }) => {
  return (
    <StyledModal isOpen {...props} zIndex={zIndex.헤더 + 100}>
      <StyledModalContent>
        <ResolutionMessage />
      </StyledModalContent>
      <StyledModalFooter align='stretch'>
        <ModalButton>이미지로 저장하기</ModalButton>
        <ModalButton background='light'>활동 후기 작성하기</ModalButton>
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
