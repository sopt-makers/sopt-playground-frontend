import { FC, useState } from 'react';

import DebugDrawer from '@/components/debug/DebugDrawer';
import SideToggleButton from '@/components/debug/SideToggleButton';
import { DEBUG } from '@/constants/Config';

const Debugger: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!DEBUG) {
    return null;
  }

  return (
    <>
      <SideToggleButton onClick={() => setIsOpen(true)} />
      <DebugDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}></DebugDrawer>
    </>
  );
};

export default Debugger;
