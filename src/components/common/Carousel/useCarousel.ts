import { ReactNode, useEffect, useMemo, useState } from 'react';

import usePagination from '@/hooks/usePagination';

export default function useCarousel({ limit, itemList }: { limit: number; itemList: ReactNode[] }) {
  const {
    page,
    moveNext: moveNextPage,
    movePrevious: movePreviousPage,
    startIndex,
    totalPageSize,
    paginate,
  } = usePagination({ limit, length: itemList.length, isLoop: true });
  const [direction, setDirection] = useState<CarouselDirection>('next');

  const currentItemList = useMemo(() => itemList.slice(startIndex, startIndex + limit), [startIndex, itemList, limit]);

  const moveNext = () => {
    moveNextPage();
    setDirection('next');
  };
  const movePrevious = () => {
    movePreviousPage();
    setDirection('previous');
  };
  const move = useMemo(
    () => (newPage: number) => {
      if (page === newPage) {
        return;
      }
      if (paginate(newPage)) {
        if (page < newPage) {
          setDirection('next');
        } else {
          setDirection('previous');
        }
      }
    },
    [page, paginate],
  );

  useEffect(() => {
    if (totalPageSize < page) {
      move(totalPageSize);
    }
  }, [totalPageSize, page, move]);

  return { page, direction, moveNext, movePrevious, currentItemList, totalPageSize, move };
}

export type CarouselDirection = 'previous' | 'next';
