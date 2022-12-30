export interface ToastEntry {
  option: ToastOption;
}

export interface ToastOption {
  message: string;
}

export interface ToastController {
  show: (option: ToastOption) => void;
}
