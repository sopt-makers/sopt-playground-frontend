import { FC, useState } from 'react';

import SidePanel from '@/components/debug/SidePanel';
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
      <SidePanel isOpen={isOpen} onClose={() => setIsOpen(false)}></SidePanel>
    </>
  );
};

export default Debugger;
