import { createContext } from 'react';

import { SlideUpController } from '@/components/common/SlideUp/types';

export const SlideUpContext = createContext<SlideUpController>(createUninitializedController());

function createUninitializedController() {
  return new Proxy({} as SlideUpController, {
    get() {
      throw new Error('SlideUpController가 세팅되지 않았습니다.');
    },
  });
}
