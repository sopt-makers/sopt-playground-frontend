import { createContext, FC, ReactNode, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { ToastStatus } from '@/components/projects/upload/ToastProvider/types';
import { TimeoutID } from '@/types';

export const ToastContext = createContext({ showToast(message: string) {} });

interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
}

export const ToastProvider: FC<ToastProviderProps> = ({ duration = 1000, children }) => {
  const [toast, setToast] = useState<ToastStatus>({ isActive: false, message: '' });
  const timeoutID = useRef<TimeoutID | undefined>();
  const [animation, setAnimation] = useState<'slide-in' | 'slide-out'>('slide-in');

  const showToast = (message: string) => {
    if (timeoutID.current) return;
    setToast({ isActive: true, message });
    timeoutID.current = setTimeout(() => {
      hideToast();
      timeoutID.current && clearTimeout(timeoutID.current);
      timeoutID.current = undefined;
    }, (duration ?? 1000) + 600);
  };
  const hideToast = () => setToast({ isActive: false, message: '' });

  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;
    if (toast.isActive) {
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
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <StyledContainer>
        {toast.isActive && <StyledToastItem animation={animation}>{toast.message}</StyledToastItem>}
      </StyledContainer>
    </ToastContext.Provider>
  );
};

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
`;

const StyledToastItem = styled.div<{ animation: string }>`
  position: sticky;
  top: 10px;
  margin: 20px 14px;
  background-color: white;
  padding: 20px;
  animation: 0.3s forwards ${(props) => props.animation};
  color: black;

  @keyframes slide-in {
    from {
      transform: translateX(300%);
    }

    to {
      transform: translateX(0%);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateX(0%);
    }

    to {
      transform: translateX(300%);
    }
  }
`;
