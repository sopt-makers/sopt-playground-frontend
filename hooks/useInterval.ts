import { useEffect, useRef } from 'react';

type IntervalId = ReturnType<typeof setInterval>;

export default function useInterval(callback: () => void, delay: number) {
  const intervalId = useRef<IntervalId | null>(null);

  const clear = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }
  };

  useEffect(() => {
    intervalId.current = setInterval(callback, delay);
    return () => {
      clear();
    };
  }, [callback, delay]);

  return {
    clear,
  };
}
