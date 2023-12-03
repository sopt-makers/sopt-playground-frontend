import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useRef } from 'react';

import { NavigationContext } from '@/components/navigation/navigationContext';

interface ScrollProviderProps {
  children: ReactNode;
}

const NavigationProvider: FC<ScrollProviderProps> = ({ children }) => {
  const router = useRouter();
  const lastRouteStateRef = useRef<{
    fromPath: string;
    type: 'back' | 'move';
  } | null>(null);

  useEffect(() => {
    const handleBack = () => {
      if (lastRouteStateRef.current?.fromPath !== router.asPath) {
        lastRouteStateRef.current = {
          fromPath: router.asPath,
          type: 'back',
        };
      }
    };

    const handleStart = () => {
      if (lastRouteStateRef.current == null || lastRouteStateRef.current.fromPath !== router.asPath) {
        lastRouteStateRef.current = {
          fromPath: router.asPath,
          type: 'move',
        };
      }
    };

    router.beforePopState(() => {
      handleBack();
      return true;
    });

    router.events.on('routeChangeStart', handleStart);

    return () => {
      router.beforePopState(() => {
        return true;
      });
      router.events.off('routeChangeStart', handleStart);
    };
  }, [router]);

  return (
    <NavigationContext.Provider
      value={{
        getLastRouteState: () => {
          return lastRouteStateRef.current ?? null;
        },
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
