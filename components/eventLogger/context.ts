import { createContext } from 'react';

import { EventLoggerController } from '@/components/eventLogger/types';

export const EventLoggerContext = createContext<EventLoggerController>(
  new Proxy({} as EventLoggerController, {
    get(_, key) {
      return (...params: unknown[]) => {
        console.log(`[EventLogger.${key.toString}]`, ...params);
      };
    },
  }),
);
