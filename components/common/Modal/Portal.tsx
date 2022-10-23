import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props extends PropsWithChildren<unknown> {}
const Portal: FC<Props> = (props) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
    setElement(modalRoot);
  }, []);

  if (!element) {
    return <></>;
  }

  return createPortal(props.children, element);
};

export default Portal;
