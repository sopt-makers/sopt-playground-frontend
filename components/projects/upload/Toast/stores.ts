import { Toast } from '@/components/projects/upload/types';
import { atom } from 'recoil';

export const toastState = atom<Toast>({
  key: 'toastState',
  default: { isActive: false, message: '' },
});
