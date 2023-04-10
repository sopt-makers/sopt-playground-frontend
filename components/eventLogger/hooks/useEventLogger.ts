import { useContext } from 'react';

import { EventLoggerContext } from '@/components/eventLogger/context';

const useEventLogger = () => {
  const controller = useContext(EventLoggerContext);

  return {
    logClickEvent: controller.clickEvent,
    logSubmitEvent: controller.submitEvent,
    logPageViewEvent: controller.pageViewEvent,
  };
};

export default useEventLogger;
