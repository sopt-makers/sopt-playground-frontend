import { loadAccessToken } from '@/components/auth/accessToken';
import useClientSideOnce from '@/hooks/useClientSideOnce';
import { FC, ReactNode } from 'react';

export const AuthProvider: FC<{ children: ReactNode }> = (props) => {
  useClientSideOnce(() => {
    loadAccessToken();
  });

  return <>{props.children}</>;
};

export default AuthProvider;
