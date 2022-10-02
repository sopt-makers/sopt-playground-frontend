import { FC, ReactNode } from 'react';
import { loadAccessToken } from '@/components/auth/accessToken';
import useClientSideOnce from '@/hooks/useClientSideOnce';

export const AuthProvider: FC<{ children: ReactNode }> = (props) => {
  useClientSideOnce(() => {
    loadAccessToken();
  });

  return <>{props.children}</>;
};

export default AuthProvider;
