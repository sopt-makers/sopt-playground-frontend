import { useEffect } from 'react';

import { useSelectDesktop } from './SelectDesktopContext';

interface SelectDesktopGroupHandlerProps {
  onGroupClick: (title: string) => void;
}

export function SelectDesktopGroupHandler({ onGroupClick }: SelectDesktopGroupHandlerProps) {
  const { setGroupClickHandler } = useSelectDesktop();

  useEffect(() => {
    setGroupClickHandler(onGroupClick);
  }, [setGroupClickHandler, onGroupClick]);

  return null;
}
