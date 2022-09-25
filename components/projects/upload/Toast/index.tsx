import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import useToast from '@/components/projects/upload/Toast/useToast';

interface ProjectToastProps {
  duration?: number;
}

const ProjectToast: FC<ProjectToastProps> = ({ duration = 1000 }) => {
  const { message, isActive } = useToast();
  const [animation, setAnimation] = useState<'slide-in' | 'slide-out'>('slide-in');

  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;
    if (isActive) {
      animationTimeout = setTimeout(() => {
        setAnimation('slide-out');
        clearTimeout(animationTimeout);
      }, duration);
    } else {
      setAnimation('slide-in');
    }
    return () => clearTimeout(animationTimeout);
  }, [duration, isActive, animation]);

  return (
    <StyledContainer>{isActive && <StyledToastItem animation={animation}>{message}</StyledToastItem>}</StyledContainer>
  );
};

export default ProjectToast;

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
