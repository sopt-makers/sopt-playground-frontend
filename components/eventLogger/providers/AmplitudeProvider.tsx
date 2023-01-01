import { createInstance } from '@amplitude/analytics-browser';
import { FC, ReactNode, useMemo } from 'react';

import { EventLoggerContext } from '@/components/eventLogger/context';
import { EventLoggerController } from '@/components/eventLogger/types';

interface EventLoggerProviderProps {
  children: ReactNode;
  apiKey: string;
}

const AmplitudeProvider: FC<EventLoggerProviderProps> = ({ children, apiKey }) => {
  const controller = useMemo(() => createAmplitudeController(apiKey), [apiKey]);

  return <EventLoggerContext.Provider value={controller}>{children}</EventLoggerContext.Provider>;
};

export default AmplitudeProvider;

function createAmplitudeController(apiKey: string): EventLoggerController {
  const instance = createInstance();
  instance.init(apiKey);

  return {
    clickEvent(key, params) {
      instance.track(`Click-${key}`, params);
    },
  };
}
