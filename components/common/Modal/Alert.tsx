import styled from '@emotion/styled';
import { FC, PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface AlertModalProps {
  title?: string;
  okText?: string;
  afterClose?: () => void;
}
const AlertModal: FC<PropsWithChildren<AlertModalProps>> = ({ title = '', okText, afterClose, children, ...props }) => {
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
        <Button onClick={onClose} variant='primary'>
          {okText ?? '완료'}
        </Button>
      </StyledModalFooter>
    </Modal>
  );
};

const StyledModalFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 42px;
`;

export default AlertModal;

function createAlertElement(props: AlertModalProps) {
  const divTarget = document.createElement('div');
  divTarget.id = 'makers-alert';
  document.body.appendChild(divTarget);
  const root = createRoot(divTarget);
  root.render(
    <Suspense fallback={null}>
      <AlertModal
        {...props}
        afterClose={() => {
          removeAlertElement(divTarget, root);
          props.afterClose?.();
        }}
      />
    </Suspense>,
  );
}

function removeAlertElement(target: HTMLElement, root: Root) {
  if (target && target.parentNode) {
    root.unmount();
    target.parentNode.removeChild(target);
  }
}

export function Alert(props: AlertModalProps): Promise<void> {
  return new Promise((resolve) => {
    createAlertElement({
      ...props,
      afterClose: () => {
        resolve();
        props.afterClose?.();
      },
    });
  });
}
