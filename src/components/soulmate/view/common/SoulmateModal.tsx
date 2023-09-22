import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import dynamic from 'next/dynamic';
import { FC, ReactNode } from 'react';

import { colors } from '@sopt-makers/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const DialogPortal = dynamic(() => import('@radix-ui/react-dialog').then((res) => res.Portal), {
  ssr: false,
});

interface SoulmateModalProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (val: boolean) => void;
  trigger?: ReactNode;
}

const SoulmateModal: FC<SoulmateModalProps> = ({ children, open, onOpenChange, trigger }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          {children}
          <Dialog.Close>
            <CloseButton>{closeIcon}</CloseButton>
          </Dialog.Close>
        </DialogContent>
      </DialogPortal>
    </Dialog.Root>
  );
};

const closeIcon = (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M2 2L18 18' stroke='#989BA0' stroke-width='3' stroke-linecap='round' />
    <path d='M18 2L2 18' stroke='#989BA0' stroke-width='3' stroke-linecap='round' />
  </svg>
);

export default SoulmateModal;

const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0 0 0 / 50%);
`;

const DialogContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  background-color: ${colors.black60};
  padding: 30px 26px;
  width: calc(100vw - 72px);
  max-width: 360px;
  max-height: 85vh;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 12px;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 30px;
  right: 26px;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;

  & > svg {
    width: 16px;
    height: 16px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    top: 20px;
    right: 20px;
  }
`;
