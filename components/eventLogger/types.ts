import { ClickEvents, PageViewEvents, SubmitEvents } from '@/components/eventLogger/events';

export interface EventLoggerController {
  clickEvent<K extends keyof ClickEvents>(key: K, params: ClickEvents[K]): void;
  submitEvent<K extends keyof SubmitEvents>(key: K, params: SubmitEvents[K]): void;
  pageViewEvent<K extends keyof PageViewEvents>(key: K, params?: PageViewEvents[K]): void;
}
