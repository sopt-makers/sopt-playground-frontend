import { useEffect, useRef } from 'react';

const useEnterScreen = <T extends Element = never>(callback: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }

      callback();

      observer.disconnect();
    }, {});

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);

  return {
    ref,
  };
};

export default useEnterScreen;
