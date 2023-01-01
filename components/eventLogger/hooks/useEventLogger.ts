import { useContext } from 'react';

import { EventLoggerContext } from '@/components/eventLogger/context';

const useEventLogger = () => {
  const controller = useContext(EventLoggerContext);

  return {
    logEvent: controller.logEvent,
  };
};

export default useEventLogger;
