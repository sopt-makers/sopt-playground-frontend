import { createContext } from 'react';

import { EventLoggerController } from '@/components/eventLogger/types';

export const EventLoggerContext = createContext<EventLoggerController>({
  clickEvent(key, params) {
    console.log('[undefined.logEvent]', key, params);
  },
});
