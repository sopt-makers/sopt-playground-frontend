import { action } from '@storybook/addon-actions';

import { EventLoggerController } from '@/components/eventLogger/types';

export function createStorybookActionController(): EventLoggerController {
  return {
    clickEvent(key, ...params) {
      action('EventLogger.clickEvent')(key, ...params);
    },
    submitEvent(key, ...params) {
      action('EventLogger.submitEvent')(key, ...params);
    },
    pageViewEvent(key, ...params) {
      action('EventLogger.pageviewEvent')(key, ...params);
    },
    impressionEvent(key, ...params) {
      action('EventLogger.impressionEvent')(key, ...params);
    },
    setUserProperties(properties) {
      action('EventLogger.setUserProperties')(properties);
    },
  };
}
