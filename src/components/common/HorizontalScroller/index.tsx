import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';

interface HorizontalScrollerProps {
  className?: string;
  children: ReactNode;
  leftButton?: ReactNode;
  rightButton?: ReactNode;
}

/**
 * 가로 스크롤바 없이 가로 스크롤을 편리하게 사용할 수 있게 해주는 컴포넌트입니다.
 *
 * - 클릭하면 화면에 보이는 크기의 2/3 만큼씩 이동합니다.
 * - 왼쪽 끝이나 오른쪽 끝에 도달하면 화살표 사라집니다.
 * - 마우스를 사용하면서 컨테이너 호버시에만 버튼이 노출됩니다.
 * - 스크롤바는 감춰지되, 터치 or 가로 스크롤 가능한 디바이스로는 스크롤 가능합니다.
 */
const HorizontalScroller = forwardRef<HTMLDivElement, HorizontalScrollerProps>(
  ({ className, children, leftButton, rightButton }, ref) => {
    const outerRef = useRef<HTMLDivElement>(null);

    const [isLeftMovable, setIsLeftMovable] = useState(false);
    const [isRightMovable, setIsRightMovable] = useState(false);

    useEffect(() => {
      const outerDiv = outerRef.current;
      if (outerDiv == null) {
        return;
      }

      const calculateScrollable = () => {
        const left = outerDiv.scrollLeft;
        const scrollWidth = outerDiv.scrollWidth;
        const displayWidth = outerDiv.clientWidth;

        setIsLeftMovable(left !== 0);
        setIsRightMovable(scrollWidth - displayWidth !== left);
      };

      const observer = new ResizeObserver(([entry]) => {
        if (entry) {
          calculateScrollable();
        }
      });

      calculateScrollable();

      outerDiv.addEventListener('scroll', calculateScrollable);
      observer.observe(outerDiv);

      return () => {
        outerDiv.removeEventListener('scroll', calculateScrollable);
        observer.disconnect();
      };
    }, []);

    function scrollLeft() {
      const scrollWidth = outerRef?.current?.clientWidth ?? 0;

      outerRef.current?.scrollBy({
        left: -((scrollWidth * 2) / 3),
        behavior: 'smooth',
      });
    }

    function scrollRight() {
      const scrollWidth = outerRef?.current?.clientWidth ?? 0;

      outerRef.current?.scrollBy({
        left: (scrollWidth * 2) / 3,
        behavior: 'smooth',
      });
    }

    return (
      <Container className={className} ref={ref}>
        <ScrollContainer ref={outerRef}>{children}</ScrollContainer>
        {isLeftMovable && (
          <LeftScrollSlot>{leftButton ?? <ScrollButton onClick={scrollLeft}>{backIcon}</ScrollButton>}</LeftScrollSlot>
        )}
        {isRightMovable && (
          <RightScrollSlot>
            {rightButton ?? (
              <ScrollButton onClick={scrollRight} css={{ transform: 'rotate(180deg)' }}>
                {backIcon}
              </ScrollButton>
            )}
          </RightScrollSlot>
        )}
      </Container>
    );
  },
);

export default HorizontalScroller;

const Container = styled.div`
  --arrow-display: none;

  position: relative;

  @media (pointer: fine) {
    &:hover {
      --arrow-display: flex;
    }
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  position: relative;
  overflow-x: scroll;
  white-space: nowrap;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const LeftScrollSlot = styled.div`
  display: var(--arrow-display);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  align-items: center;
`;

const RightScrollSlot = styled.div`
  display: var(--arrow-display);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  align-items: center;
`;

const ScrollButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 6px;
  border-radius: 50%;
  background-color: ${colors.gray30};
  width: 20px;
  height: 20px;
  color: ${colors.gray800};
`;

const backIcon = (
  <svg width='20' height='20' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M19.0001 11L13.0001 17L19.0001 23'
      stroke='currentColor'
      strokeWidth='1.4'
      strokeLinecap='square'
      strokeLinejoin='round'
    />
  </svg>
);
