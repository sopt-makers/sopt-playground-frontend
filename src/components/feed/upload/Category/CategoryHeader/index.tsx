import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import useCategory from '@/components/feed/common/hooks/useCategory';
import { FeedDataType } from '@/components/feed/upload/types';
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
    <CategoryContainer>
      {!feedData.categoryId ? (
        <CategorySelectorStarter onClick={openCategory}>
          <UploadTitle>어떤 게시판에 올릴까요?</UploadTitle>
          <OpenArrow fill='white' />
        </CategorySelectorStarter>
      ) : (
        <CategoryWrapper>
          <CategoryTitle type='button' onClick={openCategory}>
            {parentCategory?.name} <OpenArrow fill='white' />
          </CategoryTitle>
          {parentCategory?.children.length !== 0 && childrenCategory ? (
            <CategoryTitle type='button' onClick={openTag}>
              {childrenCategory.name}
              <OpenArrow fill='white' />
            </CategoryTitle>
          ) : (
            <>
              {parentCategory?.children.length !== 0 && parentCategory && (
                <CategorySelectorStarter onClick={openTag}>
                  <UploadTitle>어떤 주제인가요?</UploadTitle>
                  <OpenArrow fill='white' />
                </CategorySelectorStarter>
              )}
            </>
          )}
        </CategoryWrapper>
      )}
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CategoryTitle = styled.button`
  box-sizing: border-box;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.gray100};
  border-radius: 9999px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 10px 20px;
  width: fit-content;
  height: 42px;
  color: ${colors.gray10};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 9px 14px;
    height: 36px;

    &:hover {
      background-color: transparent;
    }
  }
`;

const UploadTitle = styled.h1`
  ${textStyles.SUIT_16_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_SB}
  }
`;

const OpenArrow = styled(Arrow)`
  width: 14px;
  height: 14px;
`;

const CategorySelectorStarter = styled.header`
  box-sizing: border-box;
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
  color: ${colors.gray300};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 9px 14px;
    width: fit-content;
    height: 36px;

    &:hover {
      background-color: transparent;
    }
  }
`;
