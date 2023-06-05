import { createInstance } from '@amplitude/analytics-browser';

import { EventLoggerController } from '@/components/eventLogger/types';

export function createAmplitudeController(apiKey: string, userId: string | undefined): EventLoggerController {
  const instance = createInstance();
  instance.init(apiKey, userId, {
    minIdLength: 1,
  });

  return {
    clickEvent(key, ...params) {
      instance.track(`Click-${key}`, ...params);
    },
    submitEvent(key, ...params) {
      instance.track(`Submit-${key}`, ...params);
    },
    pageViewEvent(key, ...params) {
      instance.track(`Pageview-${key}`, ...params);
    },
  };
}
