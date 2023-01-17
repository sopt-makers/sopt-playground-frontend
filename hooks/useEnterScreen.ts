import { useEffect, useRef } from 'react';

interface UseEnterScreenVariables {
  onEnter?: () => void;
}
const useEnterScreen = <T extends Element = never>(variables: UseEnterScreenVariables) => {
  const { onEnter } = variables;
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }
      onEnter?.();
      observer.disconnect();
    }, {});

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, onEnter]);

  return {
    ref,
  };
};

export default useEnterScreen;
