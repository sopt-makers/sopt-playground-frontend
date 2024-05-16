import styled from '@emotion/styled';
import { FC, ReactNode, useMemo, useState } from 'react';

import Portal from '@/components/common/Portal';
import { ToastContext } from '@/components/common/Toast/context';
import ToastEntry from '@/components/common/Toast/ToastEntry';
import ToastMDSEntry from '@/components/common/Toast/ToastMDSEntry';
import { ToastController, ToastEntryData, ToastOption } from '@/components/common/Toast/types';
import useAtomicTimeout from '@/components/common/Toast/useAtomicTimeout';
import { zIndex } from '@/styles/zIndex';

interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
}
const ToastProvider: FC<ToastProviderProps> = ({ duration = 6000, children }) => {
  const [toast, setToast] = useState<ToastEntryData | null>(null);
  const [animation, setAnimation] = useState<'slide-in' | 'slide-out' | 'slide-reset'>('slide-reset');
  const toastTimeout = useAtomicTimeout();
  const controller: ToastController = useMemo(
    () => ({
      show: async ({ title, message, status, isMds, buttonText, linkUrl }: ToastOption) => {
        setToast({ option: { title, message, status, isMds, buttonText, linkUrl } });
        setAnimation('slide-out');

        // slide-reset 값 세팅이 무시되지 않도록, slide-in 값 세팅을 이벤트 루프 뒤로 보내기
        await sleep(0);

        setAnimation('slide-out');
        toastTimeout.set(() => {
          setAnimation('slide-in');
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
          {toast &&
            (toast.option?.isMds ? (
              <ToastMDSEntry
                message={toast.option.message}
                status={toast.option.status}
                isMds={toast.option.isMds}
                buttonText={toast.option.buttonText}
                linkUrl={toast.option.linkUrl}
              />
            ) : (
              <ToastEntry title={toast.option.title} message={toast.option.message} />
            ))}
        </ToastContainer>
      </Portal>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

const ToastContainer = styled.div<{ animation: string }>`
  display: flex;
  position: fixed;
  top: -117px;
  left: 0;
  justify-content: center;
  transform: translatex(-50%);
  z-index: ${zIndex.헤더};
  width: 100%;
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
