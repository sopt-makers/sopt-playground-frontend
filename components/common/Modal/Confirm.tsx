import styled from '@emotion/styled';
import { FC, PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';

import Button from '@/components/common/Button';
import Modal, { ModalProps } from '@/components/common/Modal';

interface ConfirmModalProps extends Omit<ModalProps, 'onClose'> {
  title?: string;
  cancelText?: string;
  okText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}
const ConfirmModal: FC<PropsWithChildren<ConfirmModalProps>> = ({
  title = '',
  okText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
  children,
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
    <Modal title={title} isOpen={isOpen} onClose={handleClose} {...props}>
      {children}
      <StyledModalFooter>
        <Button onClick={handleCancel}>{okText ?? '취소'}</Button>
        <Button variant='primary' onClick={handleConfirm}>
          {cancelText ?? '완료'}
        </Button>
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
