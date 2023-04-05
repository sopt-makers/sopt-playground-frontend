import { ClickEvents, PageviewEvents, SubmitEvents } from '@/components/eventLogger/events';

export interface EventLoggerController {
  clickEvent<K extends keyof ClickEvents>(key: K, params: ClickEvents[K]): void;
  submitEvent<K extends keyof SubmitEvents>(key: K, params: SubmitEvents[K]): void;
  pageviewEvent<K extends keyof PageviewEvents>(key: K, params?: PageviewEvents[K]): void;
}
