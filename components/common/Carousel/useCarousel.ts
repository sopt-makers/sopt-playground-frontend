import { ReactNode, useMemo, useState } from 'react';

import usePagination from '@/hooks/usePagination';

export default function useCarousel({ limit, totalItemList }: { limit: number; totalItemList: ReactNode[] }) {
  const {
    page,
    moveNext: moveNextPage,
    movePrevious: movePreviousPage,
    startIndex,
    totalPageSize,
  } = usePagination({ limit, length: totalItemList.length });
  const [direction, setDirection] = useState<-1 | 1>(1);

  const currentItemList = useMemo(
    () => totalItemList.slice(startIndex, startIndex + limit),
    [startIndex, totalItemList, limit],
  );

  const moveNext = () => {
    moveNextPage();
    setDirection(1);
  };
  const movePrevious = () => {
    movePreviousPage();
    setDirection(-1);
  };

  return { page, direction, moveNext, movePrevious, currentItemList, totalPageSize };
}
