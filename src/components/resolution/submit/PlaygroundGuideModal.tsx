import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Modal from '@/components/common/Modal';
import { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

interface PlaygroundGuideModal extends ModalProps {}

const PlaygroundGuideModal = ({ ...props }: PlaygroundGuideModal) => {
  return (
    <StyledModal isOpen {...props} zIndex={zIndex.헤더 + 100} onOpenAutoFocus={(e) => e.preventDefault()}>
      다른기능이동
    </StyledModal>
  );
};

export default PlaygroundGuideModal;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  background-color: ${colors.gray900};
  padding: 18px;
  width: 430px;
  min-width: 320px;
  max-height: 100vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }
`;
