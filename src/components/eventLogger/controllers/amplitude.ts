import { createInstance, Identify } from '@amplitude/analytics-browser';

import { UserProperties } from '@/components/eventLogger/events';
import { EventLoggerController } from '@/components/eventLogger/types';

export function createAmplitudeController(apiKey: string, userId: string | undefined): EventLoggerController {
  const instance = createInstance();
  instance.init(apiKey, userId, {
    minIdLength: 1,
    defaultTracking: {
      pageViews: true,
      sessions: true,
    },
  });

  const setUserProperties = (properties: UserProperties) => {
    const identify = new Identify();
    for (const [key, value] of Object.entries(properties)) {
      if (value !== null) {
        identify.set(key, value);
      }
    }
    instance.identify(identify);
  };

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
    impressionEvent(key, ...params) {
      instance.track(`Impression-${key}`, ...params);
    },
    setUserProperties,
  };
}
