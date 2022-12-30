import styled from '@emotion/styled';
import { FC, ReactNode, useMemo, useState } from 'react';

import Portal from '@/components/common/Portal';
import { ToastContext } from '@/components/common/Toast/context';
import { ToastController, ToastEntry, ToastOption } from '@/components/common/Toast/types';
import useAtomicTimeout from '@/components/common/Toast/useAtomicTimeout';
import { colors } from '@/styles/colors';

interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
}

export const ToastProvider: FC<ToastProviderProps> = ({ duration = 1000, children }) => {
  const [toast, setToast] = useState<ToastEntry | null>(null);
  const [animation, setAnimation] = useState<'slide-in' | 'slide-out' | 'slide-reset'>('slide-in');
  const toastTimeout = useAtomicTimeout();

  const controller: ToastController = useMemo(
    () => ({
      show: async ({ message }: ToastOption) => {
        setToast({ option: { message } });
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
        <StyledContainer>
          {toast && <StyledToastItem animation={animation}>{toast.option.message}</StyledToastItem>}
        </StyledContainer>
      </Portal>
    </ToastContext.Provider>
  );
};

const StyledContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
`;

const StyledToastItem = styled.div<{ animation: string }>`
  position: sticky;
  bottom: 71px;
  left: 36px;
  margin: 20px 14px;
  border-radius: 8px;
  background: #fff;
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 24px;
  width: 343px;
  animation: 0.3s forwards ${(props) => props.animation};
  line-height: 136%;
  color: black;
  color: ${colors.gray80};
  font-size: 16px;
  font-weight: 500;

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
