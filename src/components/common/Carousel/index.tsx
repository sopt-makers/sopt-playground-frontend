import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { AnimatePresence, m } from 'framer-motion';
import { ReactNode } from 'react';

import CarouselBody from '@/components/common/Carousel/Body';
import useCarousel, { CarouselDirection } from '@/components/common/Carousel/useCarousel';
import LeftArrowIcon from '@/public/icons/icon-arrow-mono.svg';

interface CarouselProps {
  itemList: ReactNode[];
  limit: number;
  className?: string;
  renderItemContainer: (children: ReactNode) => ReactNode;
  onMove?: () => void;
}

export default function Carousel({ itemList, limit, className, renderItemContainer, onMove }: CarouselProps) {
  const { page, direction, moveNext, movePrevious, currentItemList, totalPageSize, move } = useCarousel({
    limit,
    itemList,
  });

  const handleClickLeftControl = () => {
    movePrevious();
    onMove?.();
  };

  const handleClickRightControl = () => {
    moveNext();
    onMove?.();
  };

  const handleClickIndicator = (page: number) => {
    move(page);
    onMove?.();
  };

  return (
    <Container className={className}>
      <AnimatePresence initial={false} custom={direction}>
        <StyledMotionDiv
          key={page}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <CarouselBody currentItemList={currentItemList} renderContainer={renderItemContainer} />
        </StyledMotionDiv>
      </AnimatePresence>
      <LeftControl onClick={handleClickLeftControl}>
        <LeftArrowIcon />
      </LeftControl>
      <RightControl onClick={handleClickRightControl}>
        <RightArrowIcon />
      </RightControl>
      <Indicators>
        {Array(totalPageSize)
          .fill(null)
          .map((_, index) => (
            <Indicator onClick={() => handleClickIndicator(index + 1)} isActive={index + 1 === page} key={`${index}`} />
          ))}
      </Indicators>
    </Container>
  );
}

const variants = {
  enter: (direction: CarouselDirection) => {
    return {
      x: direction === 'next' ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
};

const Container = styled.div`
  display: grid;
  grid:
    [row1-start] 'left-control list right-control' max-content [row1-end]
    [row2-start] 'indicators indicators indicators' max-content [row2-end]
    / min-content auto min-content;
  row-gap: 24px;
  column-gap: 16px;
  width: 100%;
  overflow: hidden;
`;

const Control = styled.button`
  align-self: center;
  border-radius: 50%;
  background-color: ${colors.gray700};
  width: 40px;
  height: 40px;

  &:hover {
    background-color: ${colors.gray600};
  }
`;

const LeftControl = styled(Control)`
  grid-area: left-control;
  padding: 11px 17px 11px 12px;
`;

const RightControl = styled(Control)`
  grid-area: right-control;
  padding: 11px 12px 11px 17px;
`;

const RightArrowIcon = styled(LeftArrowIcon)`
  transform: rotate(180deg);
`;

const Indicators = styled.div`
  display: flex;
  grid-area: indicators;
  gap: 12px;
  justify-self: center;
`;

const Indicator = styled.div<{ isActive?: boolean }>`
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? colors.gray10 : colors.gray600)};
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  width: 8px;
  height: 8px;
`;

const StyledMotionDiv = styled(m.div)`
  grid-area: list;
`;
