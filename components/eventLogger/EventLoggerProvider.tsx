import { FC, ReactNode, useMemo } from 'react';

import { createAmplitudeController } from '@/components/eventLogger/amplitudeController';
import { EventLoggerContext } from '@/components/eventLogger/context';

interface EventLoggerProviderProps {
  children: ReactNode;
  apiKey: string;
}

const EventLoggerProvider: FC<EventLoggerProviderProps> = ({ children, apiKey }) => {
  const controller = useMemo(() => createAmplitudeController(apiKey), [apiKey]);

  return <EventLoggerContext.Provider value={controller}>{children}</EventLoggerContext.Provider>;
};

export default EventLoggerProvider;
