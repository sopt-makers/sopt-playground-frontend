import { FC, ReactNode, useEffect, useState } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint_LEGACY/hooks';
import { EventLoggerContext } from '@/components/eventLogger/context';
import { createConsoleLogController } from '@/components/eventLogger/controllers/consoleLog';

interface EventLoggerProviderProps {
  children: ReactNode;
  apiKey: string;
}

const AmplitudeProvider: FC<EventLoggerProviderProps> = ({ children, apiKey }) => {
  const [controller, setController] = useState(createConsoleLogController());
  const { data } = useGetMemberOfMe();

  useEffect(() => {
    if (!apiKey) {
      setController(createConsoleLogController());
      return;
    }
    import('@/components/eventLogger/controllers/amplitude').then(({ createAmplitudeController }) => {
      setController(() => createAmplitudeController(apiKey, data?.id ? `${data.id}` : undefined));
    });
  }, [apiKey, data]);

  return <EventLoggerContext.Provider value={controller}>{children}</EventLoggerContext.Provider>;
};

export default AmplitudeProvider;
