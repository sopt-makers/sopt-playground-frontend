import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import useCategory from '@/components/feed/common/hooks/useCategory';
import { FeedDataType } from '@/components/feed/upload/types';
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
          <UploadTitle>어떤 게시판에 올릴까요?</UploadTitle>
          <OpenArrow fill='white' />
        </CategorySelectorStarter>
      ) : (
        <CategoryContainer>
          <CategoryTitle type='button' onClick={openCategory}>
            {parentCategory?.name} <ExpandMoreArrowIcon className='icon-expand-more' />
          </CategoryTitle>
          {parentCategory?.children.length !== 0 && (
            <CategoryTitle type='button' onClick={openTag}>
              {childrenCategory ? childrenCategory.name : parentCategory && parentCategory.hasAll && '주제 선택 안 함'}
              <ExpandMoreArrowIcon className='icon-expand-more' />
            </CategoryTitle>
          )}
        </CategoryContainer>
      )}
    </>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  gap: 8px;
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
  border: 1px solid ${colors.gray700};
  border-radius: 9999px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 10px 20px;
  height: 42px;
  color: ${colors.gray10};

  .icon-expand-more {
    width: 14px;
    height: 14px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 9px 14px;

    &:hover {
      background-color: transparent;
    }
  }
`;

const UploadTitle = styled.h1`
  ${textStyles.SUIT_16_SB}

  color: ${colors.gray300};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_SB}
  }
`;

const OpenArrow = styled(Arrow)`
  width: 14px;
  height: 14px;
`;

const CategorySelectorStarter = styled.header`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${colors.gray700};
  border-radius: 9999px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 10px 20px;
  width: fit-content;
  height: 42px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 16px;
    padding: 9px 14px;
    width: fit-content;
    height: 36px;

    &:hover {
      background-color: transparent;
    }
  }
`;
