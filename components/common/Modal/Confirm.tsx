import styled from '@emotion/styled';
import { FC, PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import useModalState from '@/components/common/Modal/useModalState';

interface ConfirmModalProps {
  title?: string;
  cancelText?: string;
  okText?: string;
  afterClose?: () => void;
}
const ConfirmModal: FC<PropsWithChildren<ConfirmModalProps>> = ({
  title = '',
  okText,
  cancelText,
  afterClose,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
    afterClose?.();
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsOpen(true);
    }
  }, []);

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose} {...props}>
      {children}
      <StyledModalFooter>
        <Button onClick={onClose}>{okText ?? '취소'}</Button>
        <Button variant='primary'>{cancelText ?? '완료'}</Button>
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
  divTarget.id = 'pastel-alert';
  document.body.appendChild(divTarget);
  const root = createRoot(divTarget);
  root.render(
    <Suspense fallback={null}>
      <ConfirmModal
        {...props}
        afterClose={() => {
          removeConfirmElement(divTarget, root);
          props.afterClose?.();
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

export function Confirm(props: ConfirmModalProps): Promise<void> {
  return new Promise((resolve) => {
    createConfirmElement({
      ...props,
      afterClose: () => {
        resolve();
        props.afterClose?.();
      },
    });
  });
}
