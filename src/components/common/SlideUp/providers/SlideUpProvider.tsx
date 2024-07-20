import styled from '@emotion/styled';
import { FC, ReactNode, useMemo, useState } from 'react';

import Portal from '@/components/common/Portal';
import { SlideUpContext } from '@/components/common/SlideUp/context';
import SlideUpEntry from '@/components/common/SlideUp/SlideUpEntry';
import { SlideUpController, SlideUpEntryData, SlideUpOption } from '@/components/common/SlideUp/types';
import useAtomicTimeout from '@/components/common/Toast/useAtomicTimeout';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

interface SlidUpProviderProps {
  children: ReactNode;
  duration?: number;
}

const SlideUpProvider: FC<SlidUpProviderProps> = ({ duration = 10000, children }) => {
  const [slideUp, setSlideUp] = useState<SlideUpEntryData | null>(null);
  const [animation, setAnimation] = useState<'slide-in' | 'slide-out' | 'slide-reset'>('slide-reset');
  const slideUpTimeout = useAtomicTimeout();

  const controller: SlideUpController = useMemo(
    () => ({
      show: async ({ message, status, buttonText, action }: SlideUpOption) => {
        setSlideUp({ option: { message, status, buttonText, action } });
        setAnimation('slide-out');

        // slide-reset 값 세팅이 무시되지 않도록, slide-in 값 세팅을 이벤트 루프 뒤로 보내기
        await sleep(0);

        setAnimation('slide-out');
        slideUpTimeout.set(() => {
          setAnimation('slide-in');
        }, duration);
      },
      close: () => {
        setSlideUp(null);
      },
    }),
    [duration, slideUpTimeout],
  );

  return (
    <SlideUpContext.Provider value={controller}>
      {children}
      <Portal portalId='toast-root'>
        <SlidUpContainer animation={animation}>
          {slideUp && (
            <SlideUpEntry
              message={slideUp.option.message}
              status={slideUp.option.status}
              buttonText={slideUp.option.buttonText}
              action={slideUp.option.action}
            />
          )}
        </SlidUpContainer>
      </Portal>
    </SlideUpContext.Provider>
  );
};

export default SlideUpProvider;

const SlidUpContainer = styled.div<{ animation: string }>`
  display: flex;
  position: fixed;
  top: -155px;
  left: 0;
  justify-content: center;
  z-index: ${zIndex.헤더};
  width: 100%;
  animation: 0.3s forwards ${(props) => props.animation};
  @keyframes slide-out {
    from {
      top: -155px;
    }

    to {
      top: 0;
    }
  }

  @keyframes slide-in {
    from {
      top: 0;
    }

    to {
      top: -155px;
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

  @media ${MOBILE_MEDIA_QUERY} {
    top: -175px;
  }
`;

function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
