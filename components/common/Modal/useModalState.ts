import { useState } from 'react';

function useModalState(initialState = false) {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return { isOpen, onOpen, onClose };
}

export default useModalState;
