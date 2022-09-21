import { FC } from 'react';
import styled from '@emotion/styled';
import { Toast } from '@/components/projects/upload/types';
import { useEffect } from 'react';
import { useState } from 'react';

interface ProjectToastProps {
  toast: Toast;
  setToast: (toast: Toast) => void;
  duration?: number;
}

const ProjectToast: FC<ProjectToastProps> = ({ toast, setToast, duration = 1000 }) => {
  const { isActive, message } = toast;

  useEffect(() => {
    setTimeout(() => {
      setToast({ isActive: false, message: '' });
    }, duration);
  }, [duration, isActive, setToast]);

  return (
    <StyledContainer>
      <StyledToastItem isActive={isActive}>{message}</StyledToastItem>
    </StyledContainer>
  );
};

export default ProjectToast;

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
`;

const StyledToastItem = styled.div<{ isActive: boolean }>`
  position: sticky;
  top: 10px;
  margin: 20px 14px;
  background-color: white;
  padding: 20px;
  color: black;
  animation: 0.3s forwards ${(props) => (props.isActive ? 'slide-in' : 'slide-out')};
  visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')};

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
