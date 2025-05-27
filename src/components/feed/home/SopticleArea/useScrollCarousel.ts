import { useEffect, useRef, useState } from 'react';

interface UseScrollCarouselOptions {
  itemCount: number;
  autoSlideInterval?: number;
}

export const useScrollCarousel = ({ itemCount, autoSlideInterval = 2000 }: UseScrollCarouselOptions) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollLeftRef = useRef(0);
  const scrollMonitorRef = useRef<number | null>(null);

  const scrollToIndex = (index: number, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;

    const sectionWidth = container.clientWidth;
    container.scrollTo({
      left: sectionWidth * index,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  // 스크롤이 끝났는지 감지후 안정 상태일 때 작업을 수행
  const monitorScrollStop = (onStableScroll: () => void) => {
    const container = containerRef.current;
    if (!container) return;

    let stableCount = 0;
    const maxStableCount = 3; // 3프레임 연속 scrollLeft 변화 없을 경우 안정 상태로 간주

    const checkScroll = () => {
      const current = container.scrollLeft;

      if (current === lastScrollLeftRef.current) {
        stableCount++;
      } else {
        stableCount = 0;
        lastScrollLeftRef.current = current;
      }

      if (stableCount >= maxStableCount) {
        scrollMonitorRef.current = null;
        onStableScroll(); // 안정되었다면 콜백 실행
        return;
      }

      scrollMonitorRef.current = requestAnimationFrame(checkScroll);
    };

    if (scrollMonitorRef.current) cancelAnimationFrame(scrollMonitorRef.current);
    scrollMonitorRef.current = requestAnimationFrame(checkScroll);
  };

  // 초기 위치
  useEffect(() => {
    scrollToIndex(1, false);
  }, [itemCount]);

  // autoSlideInterval마다 자동 슬라이드
  useEffect(() => {
    const intervalId = setInterval(() => {
      scrollToIndex(activeIndex + 1);
    }, autoSlideInterval);

    return () => clearInterval(intervalId);
  }, [activeIndex, autoSlideInterval]);

  // 스크롤 이벤트 감지
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.clientWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);

      if (index === 0 || index === itemCount + 1) {
        monitorScrollStop(() => {
          if (index === 0) {
            // 처음에서 마지막으로 이동시
            scrollToIndex(itemCount, false);
            setActiveIndex(itemCount);
          } else if (index === itemCount + 1) {
            // 마지막에서 처음으로 이동시
            scrollToIndex(1, false);
            setActiveIndex(1);
          }
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [itemCount]);

  const getActualIndex = (index: number) => {
    if (index % itemCount === 0) return itemCount;
    if (index > itemCount) return index - itemCount;
    return index;
  };

  return {
    containerRef,
    activeIndex,
    getActualIndex,
    scrollToIndex,
  };
};
