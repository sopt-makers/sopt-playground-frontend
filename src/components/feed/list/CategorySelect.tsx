import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import HorizontalScroller from '@/components/common/HorizontalScroller';
import { CategoryLink, useCategoryParam } from '@/components/feed/common/queryParam';
import { textStyles } from '@/styles/typography';

interface CategorySelectProps {
  categories: {
    id: string;
    name: string;
    hasAllCategory: boolean;
    tags: {
      id: string;
      name: string;
    }[];
  }[];
}

const CategorySelect: FC<CategorySelectProps> = ({ categories }) => {
  const [currentCategoryId] = useCategoryParam({ defaultValue: '' });
  const parentCategory =
    categories.find(
      (category) => category.id === currentCategoryId || category.tags.some((tag) => tag.id === currentCategoryId),
    ) ?? null;

  return (
    <Container>
      <HorizontalScroller>
        <CategoryBox>
          <Category categoryId={undefined} active={currentCategoryId === ''}>
            전체
          </Category>
          {categories.map((category) => (
            <Category
              categoryId={category.hasAllCategory ? category.id : category.tags.at(0)?.id ?? category.id} // 하위에 "전체" 카테고리가 없으면 태그의 첫 카테고리로 보내기
              key={category.id}
              active={parentCategory?.id === category.id}
            >
              {category.name}
            </Category>
          ))}
        </CategoryBox>
      </HorizontalScroller>
      {parentCategory && parentCategory.tags.length > 0 && (
        <HorizontalScroller>
          <TagBox>
            {parentCategory.hasAllCategory && (
              <Chip categoryId={parentCategory.id} active={parentCategory.id === currentCategoryId}>
                전체
              </Chip>
            )}
            {parentCategory.tags.map((tag) => (
              <Chip key={tag.id} categoryId={tag.id} active={tag.id === currentCategoryId}>
                {tag.name}
              </Chip>
            ))}
          </TagBox>
        </HorizontalScroller>
      )}
    </Container>
  );
};

export default CategorySelect;

export const Container = styled.div`
  border-bottom: 1px solid ${colors.gray800};
  padding-bottom: 8px;
`;

export const CategoryBox = styled.div`
  display: flex;
  padding: 4px 8px;
`;

export const Category = styled(CategoryLink)<{ active: boolean }>`
  flex-shrink: 0;
  padding: 8px;
  line-height: 24px;
  letter-spacing: -0.16px;
  color: ${(props) => (props.active ? colors.gray10 : colors.gray500)};

  ${textStyles.SUIT_16_B};
`;

const TagBox = styled.div`
  display: flex;
  gap: 6px;
  padding: 0 16px;
`;

const Chip = styled(CategoryLink)<{ active: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? colors.gray10 : colors.gray800)};
  padding: 7px 14px;
  color: ${(props) => (props.active ? colors.gray950 : colors.gray50)};

  ${textStyles.SUIT_13_M}
`;
