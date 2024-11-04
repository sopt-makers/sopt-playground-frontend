import {
  ClickEvents,
  ImpressionEvents,
  PageViewEvents,
  SubmitEvents,
  UserProperties,
} from '@/components/eventLogger/events';

export interface EventLoggerController {
  clickEvent<K extends keyof ClickEvents>(key: K, ...params: ParamTuple<ClickEvents[K]>): void;
  submitEvent<K extends keyof SubmitEvents>(key: K, ...params: ParamTuple<SubmitEvents[K]>): void;
  pageViewEvent<K extends keyof PageViewEvents>(key: K, ...params: ParamTuple<PageViewEvents[K]>): void;
  impressionEvent<K extends keyof ImpressionEvents>(key: K, ...params: ParamTuple<ImpressionEvents[K]>): void;
  setUserProperties: (properties: UserProperties) => void;
}

export type ParamTuple<T> = T extends undefined ? [] : [params: T];
