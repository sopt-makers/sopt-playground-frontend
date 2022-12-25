import { TimeoutID } from '@/types';

export interface ToastEntry {
  option: ToastOption;
}

export interface Toast extends ToastEntry {
  timeoutID: TimeoutID | null;
}

export interface ToastOption {
  message: string;
}

export interface ToastController {
  show: (option: ToastOption) => void;
}
