import styled from '@emotion/styled';
import { FC, ReactNode, useCallback, useState } from 'react';
import { useEffect } from 'react';

import { ToastContext } from '@/components/common/Toast/context';
import { ToastController, ToastEntry, ToastOption } from '@/components/common/Toast/types';
import useAtomicTimeout from '@/components/common/Toast/useAtomicTimeout';
import { colors } from '@/styles/colors';
import { TimeoutID } from '@/types';

interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
}

export const ToastProvider: FC<ToastProviderProps> = ({ duration = 1000, children }) => {
  const [toast, setToast] = useState<ToastEntry | null>(null);
  const [animation, setAnimation] = useState<'slide-in' | 'slide-out'>('slide-in');
  const toastTimeout = useAtomicTimeout();

  const showToast = useCallback(
    ({ message }: ToastOption) => {
      setToast({ option: { message } });
      toastTimeout.set(() => {
        setToast(null);
      }, duration + 600);
    },
    [duration, toastTimeout],
  );

  const controller: ToastController = {
    show: showToast,
  };

  useEffect(() => {
    let animationTimeout: TimeoutID;
    if (toast) {
      animationTimeout = setTimeout(() => {
        setAnimation('slide-out');
        clearTimeout(animationTimeout);
      }, duration);
    } else {
      setAnimation('slide-in');
    }
    return () => clearTimeout(animationTimeout);
  }, [duration, toast, animation]);

  return (
    <ToastContext.Provider value={controller}>
      {children}
      <StyledContainer>
        {toast && <StyledToastItem animation={animation}>{toast.option.message}</StyledToastItem>}
      </StyledContainer>
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
`;
