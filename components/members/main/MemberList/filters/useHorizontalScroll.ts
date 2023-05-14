import { useCallback, useEffect, useRef } from 'react';

interface ScrollConfig {
  scrollSpeed?: number;
}

export const useHorizontalScroll = (config: ScrollConfig = {}) => {
  const { scrollSpeed = 2 } = config;
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartScrollLeft = useRef<number | null>(null);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.scrollBehavior = 'auto';
      container.style.overflowX = 'scroll';

      touchStartX.current = event.touches[0].clientX;
      touchStartScrollLeft.current = container.scrollLeft;
    }
  }, []);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (containerRef.current && touchStartX.current !== null && touchStartScrollLeft.current !== null) {
        const container = containerRef.current;
        const touchX = event.touches[0].clientX;
        const touchDeltaX = touchX - touchStartX.current;
        const scrollDeltaX = touchDeltaX * scrollSpeed;

        container.scrollLeft = touchStartScrollLeft.current - scrollDeltaX;
      }
    },
    [scrollSpeed],
  );

  const handleTouchEnd = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.scrollBehavior = 'smooth';
      container.style.overflowX = 'hidden';

      touchStartX.current = null;
      touchStartScrollLeft.current = null;
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);
      container.addEventListener('touchend', handleTouchEnd);

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { ref: containerRef, handleTouchStart, handleTouchMove, handleTouchEnd };
};

export default useHorizontalScroll;
