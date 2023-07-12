import { useState } from 'react';

export default function usePagination({
  limit,
  length,
  isLoop = false,
}: {
  limit: number;
  length: number;
  isLoop?: boolean;
}) {
  const [page, setPage] = useState(1);

  const totalPageSize = Math.ceil(length / limit);
  const startIndex = (page - 1) * limit;

  const paginate = (newPage: number) => {
    if (isLoop) {
      if (newPage === totalPageSize + 1) {
        setPage(1);
        return true;
      }
      if (newPage === 0) {
        setPage(totalPageSize);
        return true;
      }
      setPage(newPage);
      return true;
    }
    if (newPage <= totalPageSize && newPage >= 1) {
      setPage(newPage);
      return true;
    }
    return false;
  };
  const moveNext = () => paginate(page + 1);
  const movePrevious = () => paginate(page - 1);

  return { page, paginate, moveNext, movePrevious, totalPageSize, startIndex };
}
