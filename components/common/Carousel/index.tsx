import styled from '@emotion/styled';
import { AnimatePresence, m } from 'framer-motion';
import { ReactNode } from 'react';

import CarouselBody from '@/components/common/Carousel/Body';
import useCarousel from '@/components/common/Carousel/useCarousel';
import LeftArrowIcon from '@/public/icons/icon-arrow-purple.svg';
import { colors } from '@/styles/colors';

interface CarouselProps {
  totalItemList: ReactNode[];
  limit: number;
  className?: string;
  renderItemContainer: (children: ReactNode) => ReactNode;
}

export default function Carousel({
  totalItemList,
  limit,
  className,
  renderItemContainer: renderListContainer,
}: CarouselProps) {
  const { page, direction, moveNext, movePrevious, currentItemList, totalPageSize } = useCarousel({
    limit,
    totalItemList,
  });

  return (
    <Container className={className}>
      <AnimatePresence initial={false} custom={direction}>
        <m.div
          key={page}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <CarouselBody currentItemList={currentItemList} renderContainer={renderListContainer} />
        </m.div>
      </AnimatePresence>
      <LeftControl onClick={movePrevious}>
        <LeftArrowIcon />
      </LeftControl>
      <RightControl onClick={moveNext}>
        <RightArrowIcon />
      </RightControl>
      <Indicator>
        {Array(totalPageSize)
          .fill(null)
          .map((_, index) => (
            <Circle isColored={index + 1 === page} key={`${index}`} />
          ))}
      </Indicator>
    </Container>
  );
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Control = styled.div`
  border-radius: 50%;
  background-color: ${colors.purpledim100};
  width: 40px;
  height: 40px;
`;

const LeftControl = styled(Control)`
  position: absolute;
  top: 50%;
  left: -56px;
  transform: translateY(-50%);
  padding: 11px 17px 11px 14px;
`;

const RightControl = styled(Control)`
  position: absolute;
  top: 50%;
  right: -56px;
  transform: translateY(-50%);
  padding: 11px 14px 11px 17px;
`;

const RightArrowIcon = styled(LeftArrowIcon)`
  transform: rotate(180deg);
`;

const Indicator = styled.div`
  display: flex;
  position: absolute;
  bottom: -32px;
  left: 50%;
  gap: 12px;
  transform: translateX(-50%);
`;

const Circle = styled.div<{ isColored?: boolean }>`
  border-radius: 50%;
  background-color: ${({ isColored }) => (isColored ? colors.purple100 : colors.black40)};
  width: 8px;
  height: 8px;
`;
