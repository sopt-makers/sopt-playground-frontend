import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { MB_BIG_MEDIA_QUERY, PCTA_SM_MEDIA_QUERY } from '@/styles/mediaQuery';

interface CarouselProps {
  itemList: ReactNode[];
  limit: number;
  className?: string;
  renderItemContainer: (children: ReactNode) => ReactNode;
  onMove?: (page: number) => void;
}

export default function ScrollCarousel({ itemList, limit, className, renderItemContainer, onMove }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPageSize = Math.ceil(itemList.length / limit);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;

    const handleScroll = () => {
      const scrollPosition = carouselElement.scrollLeft;
      const itemWidth = carouselElement.clientWidth; // 현재 보이는 영역의 너비
      const newPage = Math.floor(scrollPosition / itemWidth);
      
      // 페이지 변경 시 상태 업데이트
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
        onMove?.(newPage);
      }
    };

    carouselElement.addEventListener('scroll', handleScroll);

    return () => {
      carouselElement.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, onMove]);

  // 스크롤 이동 함수
  const scrollToPage = (page: number) => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;

    const itemWidth = carouselElement.clientWidth; // 현재 보이는 영역의 너비
    carouselElement.scrollTo({
      left: itemWidth * page,
      behavior: 'smooth', // 부드럽게 스크롤
    });
  };

  const handleIndicatorClick = (page: number) => {
    setCurrentPage(page);
    scrollToPage(page);
  };

  return (
    <Container className={className}>
      <CarouselWrapper ref={carouselRef}>
        {itemList.map((item, index) => (
          <Slide key={index} limit={limit} data-index={index}>
            {renderItemContainer(item)}
          </Slide>
        ))}
      </CarouselWrapper>
      {/* 인디케이터 */}
      <Indicators>
        {Array(totalPageSize)
          .fill(null)
          .map((_, index) => (
            <Indicator 
              isActive={index === currentPage} 
              key={index} 
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
      </Indicators>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 860px;
  media ${PCTA_SM_MEDIA_QUERY}{
    max-width:420px;
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom:12px;
  padding: 8px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.div<{ limit: number }>`
  box-sizing: border-box;
  flex: 0 0 ${({ limit }) => 100 / limit}%;
  padding: 0 8px;
  scroll-snap-align: start;
`;

const Indicators = styled.div`
  display: flex;
  grid-area: indicators;
  gap: 4px;
  justify-content: center;
`;

const Indicator = styled.div<{ isActive?: boolean }>`
  border-radius: 10px;
  background-color: ${({ isActive }) => (isActive ? colors.gray10 : colors.gray600)};
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  width: 16px;
  height: 4px;
`;