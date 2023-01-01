import { FC, ReactNode, useMemo } from 'react';

import { EventLoggerContext } from '@/components/eventLogger/context';
import { createConsoleLogController } from '@/components/eventLogger/controllers/consoleLog';

interface EventLoggerProviderProps {
  children: ReactNode;
}

const DummyEventProvider: FC<EventLoggerProviderProps> = ({ children }) => {
  const controller = useMemo(() => createConsoleLogController(), []);

  return <EventLoggerContext.Provider value={controller}>{children}</EventLoggerContext.Provider>;
};

export default DummyEventProvider;
