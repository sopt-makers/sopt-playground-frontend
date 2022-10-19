import { FC, ReactNode } from 'react';

export const AuthProvider: FC<{ children: ReactNode }> = (props) => {
  return <>{props.children}</>;
};

export default AuthProvider;
