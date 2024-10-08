import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import { ModalButton, ModalContent, ModalDescription, ModalFooter, ModalTitle } from '@/components/common/Modal/parts';
import IconModalClose from '@/public/icons/icon-modal-close.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const DialogPortal = dynamic(() => import('@radix-ui/react-dialog').then((mod) => mod.Portal), {
  ssr: false,
});

export interface ModalProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  children?: ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  hideCloseButton?: boolean;
  zIndex?: number;
  onOpenAutoFocus?: (e: Event) => void;
}

const ModalComponent: FC<ModalProps> = (props) => {
  const { children, hideCloseButton, isOpen, onClose, onOpenAutoFocus, ...restProps } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <StyledBackground zIndex={props.zIndex} asChild>
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <StyledModalContainer onOpenAutoFocus={onOpenAutoFocus} asChild {...restProps}>
              <m.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                {children}
                {!hideCloseButton && (
                  <StyledCloseButton>
                    <StyledIconClose />
                  </StyledCloseButton>
                )}
              </m.div>
            </StyledModalContainer>
          </m.div>
        </StyledBackground>
      </DialogPortal>
    </Dialog.Root>
  );
};

const Modal = Object.assign(ModalComponent, {
  Title: ModalTitle,
  Content: ModalContent,
  Button: ModalButton,
  Description: ModalDescription,
  Footer: ModalFooter,
});

export default Modal;

const StyledBackground = styled(Dialog.Overlay)<{ zIndex?: number }>`
  display: flex;
  position: fixed;
  inset: 0;
  align-items: center;
  justify-content: center;
  background: var(--semantic-color-background-dimmed, rgb(15 15 18 / 80%));

  ${({ zIndex }) =>
    zIndex &&
    css`
      z-index: ${zIndex};
    `}
`;

const StyledModalContainer = styled(Dialog.Content)`
  position: relative;
  border-radius: 22px;
  background: ${colors.gray800};
  max-width: calc(100vw - 60px);
  color: ${colors.gray10};

  .rules-detail {
    padding: 0 8px;
    max-height: 520px;
    overflow: scroll;
  }
`;

const StyledCloseButton = styled(Dialog.Close)`
  display: flex;
  position: absolute;
  top: 22px;
  right: 22px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;

  @media ${MOBILE_MEDIA_QUERY} {
    top: 18px;
    right: 18px;
  }
`;

const StyledIconClose = styled(IconModalClose)``;
