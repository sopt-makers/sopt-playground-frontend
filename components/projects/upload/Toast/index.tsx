import { FC } from 'react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import useToast from '@/components/projects/upload/Toast/useToast';

interface ProjectToastProps {
  duration?: number;
}

const ProjectToast: FC<ProjectToastProps> = ({ duration = 1000 }) => {
  const { hideToast, message, isActive } = useToast();

  useEffect(() => {
    setTimeout(() => hideToast(), duration);
  }, [duration, hideToast]);

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
  visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')};
  margin: 20px 14px;
  background-color: white;
  padding: 20px;
  animation: 0.3s forwards ${(props) => (props.isActive ? 'slide-in' : 'slide-out')};
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
