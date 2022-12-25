import { TimeoutID } from '@/types';

export type ToastStatus = {
  isActive: boolean;
  message: string;
};

export interface Toast extends ToastStatus {
  timeoutID: TimeoutID | null;
}

export interface ToastOption {
  message: string;
}

export interface ToastController {
  show: (option: ToastOption) => void;
}
