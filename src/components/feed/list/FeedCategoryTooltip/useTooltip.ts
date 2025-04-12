import { RefObject, useCallback, useEffect, useState } from 'react';

export const useTooltip = (positionRef: RefObject<HTMLAnchorElement>) => {
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
    if (positionRef.current === null) return;
    setIsOpen(true);
    updateTooltipPosition();

    window.addEventListener('resize', updateTooltipPosition);

    const handleUserInteraction = () => {
      setIsOpen(false);
    };

    window.addEventListener('scroll', handleUserInteraction, { once: true });
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('resize', updateTooltipPosition);
    };
  }, [positionRef, updateTooltipPosition]);

  return { tooltipPosition, isOpen };
};
