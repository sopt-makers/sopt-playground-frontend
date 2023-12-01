import React, { ReactElement, useCallback } from 'react';

import { ClickEvents } from '@/components/eventLogger/events';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';

interface LoggingClickProps<K extends keyof ClickEvents = keyof ClickEvents> {
  eventKey: K;
  params: ClickEvents[K];
  children: ReactElement;
}

export const LoggingClick: React.FC<LoggingClickProps> = ({ eventKey, params, children }) => {
  const { logClickEvent } = useEventLogger();

  const logEvent = useCallback(() => {
    logClickEvent(eventKey, params);
  }, [eventKey, params, logClickEvent]);

  const childrenWithLogging = React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      logEvent();
      if (typeof children.props.onClick === 'function') {
        children.props.onClick(e);
      }
    },
  });

  return childrenWithLogging;
};
