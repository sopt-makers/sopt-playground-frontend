import { createContext } from 'react';

import { EventLoggerController } from '@/components/eventLogger/types';

export const EventLoggerContext = createContext<EventLoggerController>(createUninitializedController());

function createUninitializedController() {
  return new Proxy({} as EventLoggerController, {
    get() {
      throw new Error('EventLoggerController가 세팅되지 않았습니다.');
    },
  });
}
