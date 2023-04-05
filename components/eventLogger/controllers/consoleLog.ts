import { EventLoggerController } from '@/components/eventLogger/types';

export function createConsoleLogController(): EventLoggerController {
  return {
    clickEvent(key, params) {
      console.log('[EventLogger.clickEvent]', key, params);
    },
    submitEvent(key, params) {
      console.log('[EventLogger.submitEvent]', key, params);
    },
    pageviewEvent(key, params) {
      console.log('[EventLogger.pageviewEvent]', key, params);
    },
  };
}
