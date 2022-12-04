import styled from '@emotion/styled';
import FocusTrap from 'focus-trap-react';
import { FC, HTMLAttributes, PropsWithChildren, useEffect } from 'react';

import Portal from '@/components/common/Modal/Portal';
import IconModalClose from '@/public/icons/icon-modal-close.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

export interface ModalProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  title?: string;
  isOpen?: boolean;
  width?: number;
  onClose: () => void;
}
const Modal: FC<ModalProps> = (props) => {
  const { children, title = '', isOpen, onClose, width, ...restProps } = props;

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <StyledBackground>
        <FocusTrap>
          <StyledModal role='dialog' tabIndex={-1} width={width} onClick={onClose} {...restProps}>
            <div onClick={(e) => e.stopPropagation()}>
              <StyledCloseButton type='button' onClick={onClose}>
                <StyledIconClose />
              </StyledCloseButton>
              <ModalContent>
                <StyledTitle>{title}</StyledTitle>
                {children}
              </ModalContent>
            </div>
          </StyledModal>
        </FocusTrap>
      </StyledBackground>
    </Portal>
  );
};

export default Modal;

const StyledBackground = styled.div<{ visible?: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 / 40%);
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div<{ width?: number }>`
  position: relative;
  z-index: 101;
  border-radius: 22.94px;
  background: ${colors.black80};
  width: ${({ width }) => width ?? 450}px;
  color: ${colors.white};
`;

const StyledCloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 22px;
  right: 22px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
`;

const StyledIconClose = styled(IconModalClose)``;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const StyledTitle = styled.h1`
  ${textStyles.SUIT_24_B}
`;
