import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FC } from 'react';

import { ModalBottomSheet } from '@/components/common/BottomSheet/ModalBottomSheet';
import Modal from '@/components/common/Modal';
import Responsive from '@/components/common/Responsive';
import TimecapsopSubmitModalContent from '@/components/resolution/submit/TimecapsopSubmitModalContent';
import { zIndex } from '@/styles/zIndex';

interface TimecapsopSubmitModalProps {
  onClose: () => void;
  onSuccess: () => void;
  userName: string;
  isOpen: boolean;
}

const TimecapsopSubmitModal: FC<TimecapsopSubmitModalProps> = ({ onClose, onSuccess, userName, isOpen }) => {
  const router = useRouter();
  const handleClose = () => {
    onClose();
    router.push(playgroundLink.feedList());
  };

  return (
    <>
      <Responsive only='desktop'>
        <StyledModal isOpen={isOpen} onClose={handleClose} zIndex={zIndex.헤더 + 100}>
          <TimecapsopSubmitModalContent userName={userName} onClose={onClose} onSuccess={onSuccess} />
        </StyledModal>
      </Responsive>

      <Responsive only='mobile'>
        <ModalBottomSheet isOpen={isOpen} onClose={handleClose}>
          <TimecapsopSubmitModalContent userName={userName} onClose={onClose} onSuccess={onSuccess} />
        </ModalBottomSheet>
      </Responsive>
    </>
  );
};

export default TimecapsopSubmitModal;

const StyledModal = styled(Modal)`
  border-radius: 14px;
  background-color: ${colors.gray900};
  max-height: 100vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }
`;
