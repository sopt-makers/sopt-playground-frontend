import { useEffect, useRef, useState } from 'react';

const useScroll = () => {
  const lastScrollPositionRef = useRef(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [isScrollTop, setIsScrollTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      const currentScrollPosition = window.scrollY;

      setIsScrollTop(currentScrollPosition < 20);
      setIsScrollingDown(lastScrollPositionRef.current < currentScrollPosition);

      lastScrollPositionRef.current = currentScrollPosition;
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return {
    isScrollingDown,
    isScrollTop,
  };
};

export default useScroll;
