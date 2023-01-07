import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = PropsWithChildren<{
  portalId: string;
}>;

const Portal: FC<PortalProps> = ({ children, portalId }) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let modalRoot = document.getElementById(portalId);
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', portalId);
      document.body.appendChild(modalRoot);
    }
    setElement(modalRoot);
  }, [portalId]);

  if (!element) {
    return null;
  }

  return createPortal(children, element);
};

export default Portal;
