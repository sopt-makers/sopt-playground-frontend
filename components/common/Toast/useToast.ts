import { useContext } from 'react';

import { ToastContext } from '@/components/common/Toast/context';
import { ToastOption } from '@/components/common/Toast/types';

const useToast = () => {
  const controller = useContext(ToastContext);

  return {
    show(toast: ToastOption) {
      controller.show(toast);
    },
  };
};

export default useToast;
