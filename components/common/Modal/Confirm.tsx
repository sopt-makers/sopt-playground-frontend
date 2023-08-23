import styled from '@emotion/styled';
import { FC, PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';

import Button from '@/components/common/Button';
import Modal, { ModalProps } from '@/components/common/Modal';

interface ConfirmModalProps extends Omit<ModalProps, 'onClose'> {
  title?: string;
  content?: string;
  cancelText?: string;
  okText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  confirmButtonVariable?: 'default' | 'primary' | 'danger';
}
const ConfirmModal: FC<PropsWithChildren<ConfirmModalProps>> = ({
  title = '',
  content,
  okText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
  children,
  confirmButtonVariable = 'primary',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => {
    onClose?.();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    handleClose();
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsOpen(true);
    }
  }, []);

  return (
    <Modal title={title} isOpen={isOpen} content={content} onClose={handleClose} {...props}>
      {children}
      <StyledModalFooter>
        <StyledButton onClick={handleCancel} size='fill'>
          {cancelText ?? '취소'}
        </StyledButton>
        <StyledButton variant={confirmButtonVariable} onClick={handleConfirm} size='fill'>
          {okText ?? '완료'}
        </StyledButton>
      </StyledModalFooter>
    </Modal>
  );
};

const StyledModalFooter = styled.footer`
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  margin-top: 42px;
`;

const StyledButton = styled(Button)`
  border-radius: 12px;
  padding: 14px 44px;
`;

export default ConfirmModal;

function createConfirmElement(props: ConfirmModalProps) {
  const divTarget = document.createElement('div');
  divTarget.id = 'makers-confirm';
  document.body.appendChild(divTarget);
  const root = createRoot(divTarget);
  root.render(
    <Suspense fallback={null}>
      <ConfirmModal
        {...props}
        onClose={() => {
          removeConfirmElement(divTarget, root);
          props.onClose?.();
        }}
      />
    </Suspense>,
  );
}

function removeConfirmElement(target: HTMLElement, root: Root) {
  if (target && target.parentNode) {
    root.unmount();
    target.parentNode.removeChild(target);
  }
}

export function Confirm(props: ConfirmModalProps): Promise<boolean | undefined> {
  return new Promise((resolve) => {
    let resolved = false;
    createConfirmElement({
      ...props,
      onConfirm: () => {
        resolved = true;
        resolve(true);
        props.onConfirm?.();
      },
      onCancel: () => {
        resolved = true;
        resolve(false);
        props.onCancel?.();
      },
      onClose: () => {
        if (!resolved) {
          resolve(undefined);
        }
        props.onClose?.();
      },
    });
  });
}
