import { createContext } from 'react';

import { ToastController } from '@/components/common/Toast/types';

export const ToastContext = createContext<ToastController>(createUninitializedController());

function createUninitializedController() {
  return new Proxy({} as ToastController, {
    get() {
      throw new Error('ToastController가 세팅되지 않았습니다.');
    },
  });
}
