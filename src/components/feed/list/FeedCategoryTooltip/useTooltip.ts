import { RefObject, useCallback, useEffect, useState } from 'react';

const getTodayDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(
    2,
    '0',
  )}`;
};

export const useTooltip = (positionRef: RefObject<HTMLAnchorElement>, storageKey: string) => {
  const today = getTodayDate();
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const updateTooltipPosition = useCallback(() => {
    if (positionRef.current) {
      const rect = positionRef.current.getBoundingClientRect();
      const parentRect = positionRef.current.offsetParent?.getBoundingClientRect() || { top: 0, left: 0 };

      setTooltipPosition({
        top: rect.bottom - parentRect.top,
        left: rect.left - parentRect.left + 8,
      });
    }
  }, [positionRef]);

  useEffect(() => {
    const lastClosedDate = localStorage.getItem(storageKey);

    if (lastClosedDate === today || positionRef.current === null) return;

    updateTooltipPosition();
    setIsOpen(true);

    window.addEventListener('resize', updateTooltipPosition);

    return () => {
      window.removeEventListener('resize', updateTooltipPosition);
    };
  }, [positionRef, updateTooltipPosition, storageKey, today]);

  const closeTooltipForToday = () => {
    localStorage.setItem(storageKey, today);
    setIsOpen(false);
  };

  return { tooltipPosition, isOpen, closeTooltipForToday };
};
