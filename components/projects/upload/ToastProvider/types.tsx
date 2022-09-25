export type ToastStatus = {
  isActive: boolean;
  message: string;
};

export interface Toast extends ToastStatus {
  timeoutID: NodeJS.Timeout | null;
}
