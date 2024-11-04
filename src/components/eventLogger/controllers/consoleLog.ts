import { EventLoggerController } from '@/components/eventLogger/types';

export function createConsoleLogController(): EventLoggerController {
  return {
    clickEvent(key, ...params) {
      console.log('[EventLogger.clickEvent]', key, ...params);
    },
    submitEvent(key, ...params) {
      console.log('[EventLogger.submitEvent]', key, ...params);
    },
    pageViewEvent(key, ...params) {
      console.log('[EventLogger.pageviewEvent]', key, ...params);
    },
    impressionEvent(key, ...params) {
      console.log('[EventLogger.impressionEvent]', key, ...params);
    },
    setUserProperties(properties) {
      console.log(`[EventLogger.User properties]`, properties);
    },
  };
}
