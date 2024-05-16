export interface ToastEntryData {
  option: ToastOption;
}

export interface ToastOption {
  title?: string;
  message: string;
  isMds?: boolean;
  status?: 'success' | 'alert' | 'error';
  buttonText?: string;
  linkUrl?: string;
}

export interface ToastController {
  show: (option: ToastOption) => void;
}
