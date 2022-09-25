import { toastState, toastTimeoutState } from '@/components/projects/upload/Toast/stores';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useToast() {
  const [toast, setToast] = useRecoilState(toastState);
  const [timeoutID, setTimeoutID] = useRecoilState(toastTimeoutState);

  const showToast = (message: string, duration?: number) => {
    if (timeoutID) return;
    setToast({ isActive: true, message });
    setTimeoutID(
      setTimeout(() => {
        hideToast();
        timeoutID && clearTimeout(timeoutID);
        setTimeoutID(null);
      }, (duration ?? 1000) + 600),
    );
  };
  const hideToast = () => setToast({ isActive: false, message: '' });

  return { ...toast, showToast, hideToast };
}
