import { FC, useEffect, useRef, useState } from 'react';

import AccessTokenPanel from '@/components/debug/panels/AccessTokenPanel';
import SideBar from '@/components/debug/SideBar';
import SideToggleButton from '@/components/debug/SideToggleButton';
import { DEBUG } from '@/constants/Config';

const Debugger: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeDebuggerHandler = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }
      if (e.target.parentElement === null) {
        return;
      }

      if (!panelRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', closeDebuggerHandler);
    return () => {
      document.removeEventListener('click', closeDebuggerHandler);
    };
  }, []);

  if (!DEBUG) {
    return null;
  }

  return (
    <>
      <SideToggleButton ref={buttonRef} onClick={() => setIsOpen(true)} />
      <SideBar ref={panelRef} title='디버그 패널' isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AccessTokenPanel />
      </SideBar>
    </>
  );
};

export default Debugger;
