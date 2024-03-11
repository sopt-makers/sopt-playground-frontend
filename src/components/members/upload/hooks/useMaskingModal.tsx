import useConfirm from '@/components/common/Modal/useConfirm';
import { ReactNode } from 'react';

interface useMaskingModalProps {
  title: ReactNode;
  description: ReactNode;
  cancelButtonText?: string;
  okButtonText?: string;
  okButtonColor?: string;
  okButtonTextColor?: string;
  zIndex?: number;
  maxWidth?: number;
}

function useMaskingModal({
  title,
  description,
  okButtonText = '확인',
  cancelButtonText = '취소',
  maxWidth = 400,
  ...props
}: useMaskingModalProps) {
  const { confirm } = useConfirm();

  const openMaskingModal = () => {
    const result = confirm({
      title,
      description,
      okButtonText,
      cancelButtonText,
      maxWidth,
      ...props,
    });
    return result;
  };

  return { openMaskingModal };
}

export default useMaskingModal;
