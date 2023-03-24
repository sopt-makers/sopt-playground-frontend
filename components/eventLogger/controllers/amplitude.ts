import { createInstance } from '@amplitude/analytics-browser';

import { EventLoggerController } from '@/components/eventLogger/types';

export function createAmplitudeController(apiKey: string, userId: string | undefined): EventLoggerController {
  const instance = createInstance();
  instance.init(apiKey);
  instance.setUserId(userId);

  return {
    clickEvent(key, params) {
      instance.track(`Click-${key}`, params);
    },
  };
}
