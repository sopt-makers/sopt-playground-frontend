import { Toast } from '@/components/projects/upload/Toast/types';
import { atom } from 'recoil';

export const toastState = atom<Toast>({
  key: 'toastState',
  default: { isActive: false, message: '' },
});

export const toastTimeoutState = atom<NodeJS.Timeout | null>({
  key: 'toastTimeoutState',
  default: null,
});
