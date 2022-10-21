import { FC, useState } from 'react';

import AuthPanel from '@/components/debug/panels/AuthPanel';
import SideBar from '@/components/debug/SideBar';
import SideToggleButton from '@/components/debug/SideToggleButton';
import { DEBUG } from '@/constants/Config';

const Debugger: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!DEBUG) {
    return null;
  }

  return (
    <>
      <SideToggleButton onClick={() => setIsOpen(true)} />
      <SideBar title='디버그 패널' isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AuthPanel />
      </SideBar>
    </>
  );
};

export default Debugger;
