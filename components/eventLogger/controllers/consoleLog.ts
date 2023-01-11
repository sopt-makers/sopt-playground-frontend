import { EventLoggerController } from '@/components/eventLogger/types';

export function createConsoleLogController(): EventLoggerController {
  return {
    clickEvent(key, params) {
      console.log('[EventLogger.clickEvent]', key, params);
    },
  };
}
