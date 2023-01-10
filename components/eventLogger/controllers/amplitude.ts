import { createInstance } from '@amplitude/analytics-browser';

import { EventLoggerController } from '@/components/eventLogger/types';

export function createAmplitudeController(apiKey: string): EventLoggerController {
  const instance = createInstance();
  instance.init(apiKey);

  return {
    clickEvent(key, params) {
      instance.track(`Click-${key}`, params);
    },
  };
}
