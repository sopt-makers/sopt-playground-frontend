import { Events } from '@/components/eventLogger/events';

export interface EventLoggerController {
  logEvent<K extends keyof Events>(key: K, params: Events[K]): void;
}
