import styled from '@emotion/styled';
import { FC, ReactNode, useMemo, useState } from 'react';

import Portal from '@/components/common/Portal';
import { ToastContext } from '@/components/common/Toast/context';
import ToastEntry from '@/components/common/Toast/ToastEntry';
import { ToastController, ToastEntryData, ToastOption } from '@/components/common/Toast/types';
import useAtomicTimeout from '@/components/common/Toast/useAtomicTimeout';

interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
}

const ToastProvider: FC<ToastProviderProps> = ({ duration = 1000, children }) => {
  const [toast, setToast] = useState<ToastEntryData | null>(null);
  const [animation, setAnimation] = useState<'slide-in' | 'slide-out' | 'slide-reset'>('slide-in');
  const toastTimeout = useAtomicTimeout();

  const controller: ToastController = useMemo(
    () => ({
      show: async ({ title, message }: ToastOption) => {
        setToast({ option: { title, message } });
        setAnimation('slide-reset');

        // slide-reset 값 세팅이 무시되지 않도록, slide-in 값 세팅을 이벤트 루프 뒤로 보내기
        await sleep(0);

        setAnimation('slide-in');
        toastTimeout.set(() => {
          setAnimation('slide-out');
        }, duration);
      },
    }),
    [duration, toastTimeout],
  );

  return (
    <ToastContext.Provider value={controller}>
      {children}
      <Portal portalId='toast-root'>
        <ToastContainer animation={animation}>
          {toast && <ToastEntry title={toast.option.title} message={toast.option.message} />}
        </ToastContainer>
      </Portal>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

const ToastContainer = styled.div<{ animation: string }>`
  position: fixed;
  bottom: 80px;
  left: 36px;
  transform: translateY(300%);
  z-index: 100;
  min-width: 400px;
  animation: 0.3s forwards ${(props) => props.animation};

  @keyframes slide-in {
    from {
      transform: translateY(300%);
    }

    to {
      transform: translateY(0%);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0%);
    }

    to {
      transform: translateY(300%);
    }
  }

  @keyframes slide-reset {
    from {
      transform: translateY(300%);
    }

    to {
      transform: translateY(300%);
    }
  }
`;

function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
