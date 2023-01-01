import { ClickEvents } from '@/components/eventLogger/events';

export interface EventLoggerController {
  clickEvent<K extends keyof ClickEvents>(key: K, params: ClickEvents[K]): void;
}
