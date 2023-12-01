import { ReactNode } from 'react';

import { PageViewEvents } from '@/components/eventLogger/events';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { useRunOnce } from '@/hooks/useRunOnce';

interface LoggingPageViewProps<K extends keyof PageViewEvents = keyof PageViewEvents> {
  eventKey: K;
  params?: PageViewEvents[K];
  children: ReactNode;
}

export const LoggingPageView = ({ eventKey, params, children }: LoggingPageViewProps) => {
  const { logPageViewEvent } = useEventLogger();

  useRunOnce(() => {
    logPageViewEvent(eventKey, params);
  }, []);

  return <>{children}</>;
};
