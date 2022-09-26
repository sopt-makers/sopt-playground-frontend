import { TimeoutID } from '@/types';

export type ToastStatus = {
  isActive: boolean;
  message: string;
};

export interface Toast extends ToastStatus {
  timeoutID: TimeoutID | null;
}
