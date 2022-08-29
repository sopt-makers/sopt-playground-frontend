import { loadAccessToken } from '@/components/auth/accessToken';
import { FC, ReactNode, useRef } from 'react';

export const AuthProvider: FC<{ children: ReactNode }> = (props) => {
  useClientOnce(() => {
    loadAccessToken();
  });

  return <>{props.children}</>;
};

export default AuthProvider;

function useClientOnce(fn: () => void) {
  const runed = useRef(false);

  if (typeof window !== 'undefined') {
    if (!runed.current) {
      fn();
      runed.current = true;
    }
  }
}
