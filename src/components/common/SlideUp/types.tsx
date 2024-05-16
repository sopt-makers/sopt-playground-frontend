export interface SlideUpEntryData {
  option: SlideUpOption;
}

export interface SlideUpOption {
  message: string;
  status: 'success' | 'alert' | 'error';
  buttonText: string;
  linkUrl: string;
}

export interface SlideUpController {
  show: (option: SlideUpOption) => void;
}
