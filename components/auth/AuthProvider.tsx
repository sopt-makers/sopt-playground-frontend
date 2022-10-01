import { FC, ReactNode, useRef } from 'react';

import { loadAccessToken } from '@/components/auth/accessToken';

export const AuthProvider: FC<{ children: ReactNode }> = (props) => {
  useClientSideOnce(() => {
    loadAccessToken();
  });

  return <>{props.children}</>;
};

export default AuthProvider;

function useClientSideOnce(handler: () => void) {
  const isExecuted = useRef(false);

  if (typeof window !== 'undefined') {
    if (!isExecuted.current) {
      handler();
      isExecuted.current = true;
    }
  }
}
