import { createInstance } from '@amplitude/analytics-browser';

import { EventLoggerController } from '@/components/eventLogger/types';

export function createAmplitudeController(apiKey: string): EventLoggerController {
  const instance = createInstance();
  instance.init(apiKey);

  return {
    logEvent(key, params) {
      console.log(key, params);
      instance.track(key, params);
    },
  };
}
