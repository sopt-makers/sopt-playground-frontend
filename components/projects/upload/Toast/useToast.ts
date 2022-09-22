import { toastState } from '@/components/projects/upload/Toast/stores';
import { useRecoilState } from 'recoil';

export default function useToast() {
  const [toast, setToast] = useRecoilState(toastState);
  const showToast = (message: string) => setToast({ isActive: true, message: message });
  const hideToast = () => setToast({ isActive: false, message: '' });

  return { ...toast, showToast, hideToast };
}
