import { FC, useEffect, useRef, useState } from 'react';

import AccessTokenPanel from '@/components/debug/panels/AccessTokenPanel';
import NavigationPanel from '@/components/debug/panels/NavigationPanel';
import SideBar from '@/components/debug/SideBar';
import SideToggleButton from '@/components/debug/SideToggleButton';
import TimecapsopDelteButton from '@/components/resolution/delete';

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

    document.addEventListener('mousedown', closeDebuggerHandler);
    return () => {
      document.removeEventListener('mousedown', closeDebuggerHandler);
    };
  }, []);

  return (
    <>
      <SideToggleButton ref={buttonRef} onClick={() => setIsOpen(true)} />
      <SideBar ref={panelRef} title='디버그 패널' isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AccessTokenPanel />
        <NavigationPanel />
        <TimecapsopDelteButton />
      </SideBar>
    </>
  );
};

export default Debugger;
