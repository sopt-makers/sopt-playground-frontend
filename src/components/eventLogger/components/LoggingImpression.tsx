import { ImpressionArea, ImpressionAreaProps } from '@toss/impression-area';
import { PropsWithChildren, ReactNode } from 'react';

import { ImpressionEvents } from '@/components/eventLogger/events';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { ParamTuple } from '@/components/eventLogger/types';

type LoggingImpressionProps<Key extends keyof ImpressionEvents> = {
  eventKey: Key;
  children: ReactNode;
} & (undefined extends ImpressionEvents[Key] ? unknown : { param: ImpressionEvents[Key] }) &
  ImpressionAreaProps;

export const LoggingImpression = <K extends keyof ImpressionEvents = keyof ImpressionEvents>({
  eventKey,
  children,
  ...props
}: PropsWithChildren<LoggingImpressionProps<K>>) => {
  const { logImpressionEvent } = useEventLogger();

  const logEvent = () => {
    if ('param' in props) {
      logImpressionEvent<K>(eventKey, ...([props.param] as ParamTuple<ImpressionEvents[K]>));
    } else {
      logImpressionEvent<K>(eventKey, ...([undefined] as unknown as ParamTuple<ImpressionEvents[K]>));
    }
  };

  return (
    <ImpressionArea onImpressionStart={logEvent} {...props}>
      {children}
    </ImpressionArea>
  );
};
