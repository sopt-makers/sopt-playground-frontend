import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import useCategory from '@/components/feed/common/hooks/useCategory';
import { FeedDataType } from '@/components/feed/upload/types';
import DetailArrow from '@/public/icons/icon-chevron-right.svg';
import ExpandMoreArrow from '@/public/icons/icon-expand-more.svg';
import Arrow from '@/public/icons/icon-select-arrow.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface CategoryHeaderProp {
  feedData: FeedDataType;
  openCategory: () => void;
  openTag: () => void;
}

export default function CategoryHeader({ feedData, openCategory, openTag }: CategoryHeaderProp) {
  const { findParentCategory, findChildrenCategory } = useCategory();

  const parentCategory = findParentCategory(feedData.categoryId);
  const childrenCategory = findChildrenCategory(feedData.categoryId);

  return (
    <>
      {!feedData.categoryId ? (
        <CategorySelectorStarter onClick={openCategory}>
          <UploadTitle>어디에 올릴까요?</UploadTitle>
          <OpenArrow fill='white' />
        </CategorySelectorStarter>
      ) : (
        <CategoryContainer>
          <CategoryTitle type='button' onClick={openCategory}>
            {parentCategory?.name} <ExpandMoreArrowIcon className='icon-expand-more' />
          </CategoryTitle>
          {parentCategory?.children.length !== 0 && (
            <>
              <DetailArrow />
              <CategoryTitle type='button' onClick={openTag}>
                {childrenCategory
                  ? childrenCategory.name
                  : parentCategory && parentCategory.hasAll && '주제 선택 안 함'}
                <ExpandMoreArrowIcon className='icon-expand-more' />
              </CategoryTitle>
            </>
          )}
        </CategoryContainer>
      )}
    </>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 19px 16px;
  }
`;

const ExpandMoreArrowIcon = styled(ExpandMoreArrow)`
  display: none;
`;

const CategoryTitle = styled.button`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  padding: 6px;
  color: ${colors.gray10};

  &:hover {
    background-color: ${colors.gray800};

    .icon-expand-more {
      display: flex;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0;

    &:hover {
      background-color: transparent;

      .icon-expand-more {
        display: none;
      }
    }
  }
`;

const UploadTitle = styled.h1`
  ${textStyles.SUIT_16_M}

  color: ${colors.white};
`;

const OpenArrow = styled(Arrow)`
  width: 14px;
  height: 14px;
`;

const CategorySelectorStarter = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 12px;
  width: 154px;

  &:hover {
    border-radius: 8px;
    background-color: ${colors.gray800};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 19px 16px;
    width: 100%;

    &:hover {
      background-color: transparent;
    }
  }
`;
