import { FC, ReactNode, useEffect, useState } from 'react';

import { EventLoggerContext } from '@/components/eventLogger/context';
import { createConsoleLogController } from '@/components/eventLogger/controllers/consoleLog';

interface EventLoggerProviderProps {
  children: ReactNode;
  apiKey: string;
}

const AmplitudeProvider: FC<EventLoggerProviderProps> = ({ children, apiKey }) => {
  const [controller, setController] = useState(createConsoleLogController());

  useEffect(() => {
    if (!apiKey) {
      return;
    }
    import('@/components/eventLogger/controllers/amplitude').then(({ createAmplitudeController }) => {
      setController(() => createAmplitudeController(apiKey));
    });
  }, [apiKey]);

  return <EventLoggerContext.Provider value={controller}>{children}</EventLoggerContext.Provider>;
};

export default AmplitudeProvider;
