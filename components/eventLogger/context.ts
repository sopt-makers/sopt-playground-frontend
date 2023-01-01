import { createContext } from 'react';

import { EventLoggerController } from '@/components/eventLogger/types';

export const EventLoggerContext = createContext<EventLoggerController>(
  new Proxy({} as EventLoggerController, {
    get() {
      throw new Error('not initialized');
    },
  }),
);
