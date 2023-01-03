import { FC, PropsWithChildren, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props extends PropsWithChildren<unknown> {
  portalId?: string;
}
const Portal: FC<Props> = ({ portalId, children }) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const id = useId();
  const elementId = portalId ?? id;

  useEffect(() => {
    let modalRoot = document.getElementById(elementId);
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', elementId);
      document.body.appendChild(modalRoot);
    }
    setElement(modalRoot);
  }, [elementId]);

  if (!element) {
    return <></>;
  }

  return createPortal(children, element);
};

export default Portal;
