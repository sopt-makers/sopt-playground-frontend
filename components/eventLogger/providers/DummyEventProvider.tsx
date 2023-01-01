import { FC, ReactNode, useMemo } from 'react';

import { EventLoggerContext } from '@/components/eventLogger/context';
import { EventLoggerController } from '@/components/eventLogger/types';

interface EventLoggerProviderProps {
  children: ReactNode;
}

const DummyEventProvider: FC<EventLoggerProviderProps> = ({ children }) => {
  const controller = useMemo(() => createConsoleLogController(), []);

  return <EventLoggerContext.Provider value={controller}>{children}</EventLoggerContext.Provider>;
};

export default DummyEventProvider;

function createConsoleLogController(): EventLoggerController {
  return {
    clickEvent(key, params) {
      console.log('[clickEvent]', key, params);
    },
  };
}
