import { useState } from 'react';

export default function usePagination({ limit, length }: { limit: number; length: number }) {
  const [page, setPage] = useState(1);

  const totalPageSize = Math.ceil(length / limit);
  const startIndex = (page - 1) * limit;

  const paginate = (newPage: number) => {
    setPage(newPage);
  };
  const moveNext = () => page + 1 <= totalPageSize && paginate(page + 1);
  const movePrevious = () => page - 1 >= 1 && paginate(page - 1);

  return { page, paginate, moveNext, movePrevious, totalPageSize, startIndex };
}
