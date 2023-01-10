import { FC, ReactNode, useMemo } from 'react';

import { EventLoggerContext } from '@/components/eventLogger/context';
import { createStorybookActionController } from '@/components/eventLogger/controllers/storybookAction';

interface StorybookEventLoggerProviderProps {
  children: ReactNode;
}

const StorybookEventLoggerProvider: FC<StorybookEventLoggerProviderProps> = ({ children }) => {
  const controller = useMemo(() => createStorybookActionController(), []);

  return <EventLoggerContext.Provider value={controller}>{children}</EventLoggerContext.Provider>;
};

export default StorybookEventLoggerProvider;
