import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconChevronLeft, IconChevronRight } from '@sopt-makers/icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <Container>
      <NavigationButton onClick={handlePrevious} disabled={currentPage === 1}>
        <IconChevronLeft style={{ width: 24, height: 24 }} />
      </NavigationButton>

      <PageNumbers>
        {getPageNumbers().map((page, index) => (
          <PageButton
            key={`${page}-${index}`}
            onClick={() => handlePageClick(page)}
            isActive={page === currentPage}
            disabled={typeof page === 'string'}
          >
            {page}
          </PageButton>
        ))}
      </PageNumbers>

      <NavigationButton onClick={handleNext} disabled={currentPage === totalPages}>
        <IconChevronRight style={{ width: 24, height: 24 }} />
      </NavigationButton>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

const NavigationButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: none;
  border: 1px solid ${colors.gray500};
  border-radius: 100px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  color: ${colors.gray10};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 16px;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  transition: all 0.2s ease;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 0 8px;
  width: 24px;
  height: 24px;
  color: ${({ isActive }) => (isActive ? colors.attention : colors.white)};
  ${fonts.BODY_16_M}

  &:disabled {
    background-color: transparent;
    cursor: default;
    color: ${colors.gray600};
  }
`;
