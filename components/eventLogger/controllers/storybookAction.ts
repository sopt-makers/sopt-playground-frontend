import { action } from '@storybook/addon-actions';

import { EventLoggerController } from '@/components/eventLogger/types';

export function createStorybookActionController(): EventLoggerController {
  return {
    clickEvent(key, params) {
      action('EventLogger.clickEvent')(key, params);
    },
    submitEvent(key, params) {
      action('EventLogger.submitEvent')(key, params);
    },
    pageviewEvent(key, params) {
      action('EventLogger.pageviewEvent')(key, params);
    },
  };
}
