import React, { ReactElement, useCallback } from 'react';

import { ClickEvents } from '@/components/eventLogger/events';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { ParamTuple } from '@/components/eventLogger/types';

type LoggingClickProps<Key extends keyof ClickEvents> = {
  eventKey: Key;
  children: ReactElement;
} & (undefined extends ClickEvents[Key] ? unknown : { param: ClickEvents[Key] });

/**
 *
 * @description: onClick 이벤트가 있는 컴포넌트에 LoggingClick을 감싸주어 로깅을 쉽게 처리할 수 있는 컴포넌트에요.
 * 커스텀 컴포넌트의 경우 onClick 이벤트를 부착해주세요.
 */
export const LoggingClick = <K extends keyof ClickEvents = keyof ClickEvents>({
  eventKey,
  children,
  ...props
}: LoggingClickProps<K>) => {
  const { logClickEvent } = useEventLogger();

  const logEvent = useCallback(() => {
    if ('param' in props) {
      logClickEvent<K>(eventKey, ...([props.param] as ParamTuple<ClickEvents[K]>));
    } else {
      logClickEvent<K>(eventKey, ...([undefined] as ParamTuple<ClickEvents[K]>));
    }
  }, [props, eventKey, logClickEvent]);

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
