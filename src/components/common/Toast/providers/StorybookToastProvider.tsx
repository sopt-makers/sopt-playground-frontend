import { action } from '@storybook/addon-actions';
import { FC, ReactNode, useMemo } from 'react';

import { ToastContext } from '@/components/common/Toast/context';
import { ToastController } from '@/components/common/Toast/types';

interface StorybookToastProviderProps {
  children: ReactNode;
}

const StorybookToastProvider: FC<StorybookToastProviderProps> = ({ children }) => {
  const controller: ToastController = useMemo(() => {
    return {
      show(option) {
        action('toast.show')(option);
      },
    };
  }, []);

  return <ToastContext.Provider value={controller}>{children}</ToastContext.Provider>;
};

export default StorybookToastProvider;
