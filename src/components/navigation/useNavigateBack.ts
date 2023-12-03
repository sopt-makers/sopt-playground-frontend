import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';

import { NavigationContext } from '@/components/navigation/navigationContext';

export const useNavigateBack = (callback: () => void) => {
  const { getLastRouteState } = useContext(NavigationContext);
  const router = useRouter();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const fn = () => {
      if (getLastRouteState()?.type === 'back') {
        callbackRef.current?.();
      }
    };

    router.events.on('routeChangeComplete', fn);

    return () => {
      router.events.off('routeChangeComplete', fn);
    };
  }, [router, getLastRouteState]);
};
