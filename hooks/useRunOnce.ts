import { DependencyList, useEffect, useRef } from 'react';

export function useRunOnce(callback: () => void, dependencies: DependencyList) {
  const isRun = useRef(false);

  useEffect(() => {
    if (!isRun.current) {
      callback();
      isRun.current = true;
    }
  }, [callback, dependencies]);
}
