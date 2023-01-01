import { FC, ReactNode, useMemo } from 'react';

import { EventLoggerContext } from '@/components/eventLogger/context';
import { createAmplitudeController } from '@/components/eventLogger/controllers/amplitude';
import { createConsoleLogController } from '@/components/eventLogger/controllers/consoleLog';

interface EventLoggerProviderProps {
  children: ReactNode;
  apiKey: string;
}

const AmplitudeProvider: FC<EventLoggerProviderProps> = ({ children, apiKey }) => {
  const controller = useMemo(() => {
    if (!apiKey) {
      return createConsoleLogController();
    }
    return createAmplitudeController(apiKey);
  }, [apiKey]);

  return <EventLoggerContext.Provider value={controller}>{children}</EventLoggerContext.Provider>;
};

export default AmplitudeProvider;
