import { ReactNode } from 'react';

import { PageViewEvents } from '@/components/eventLogger/events';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { ParamTuple } from '@/components/eventLogger/types';
import { useRunOnce } from '@/hooks/useRunOnce';

type LoggingPageViewProps<Key extends keyof PageViewEvents> = {
  eventKey: Key;
  children: ReactNode;
} & (undefined extends PageViewEvents[Key] ? unknown : { param: PageViewEvents[Key] });

export const LoggingPageView = <K extends keyof PageViewEvents = keyof PageViewEvents>({
  eventKey,
  children,
  ...props
}: LoggingPageViewProps<K>) => {
  const { logPageViewEvent } = useEventLogger();

  useRunOnce(() => {
    if ('param' in props) {
      logPageViewEvent<K>(eventKey, ...([props.param] as ParamTuple<PageViewEvents[K]>));
    } else {
      logPageViewEvent<K>(eventKey, ...([undefined] as ParamTuple<PageViewEvents[K]>));
    }
  }, []);

  return <>{children}</>;
};
