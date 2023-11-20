import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

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
      {parentCategory && parentCategory.tags.length > 0 && (
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
      )}
    </Container>
  );
};

export default CategorySelect;

export const Container = styled.div``;

export const CategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 4px 8px;
`;

export const Category = styled(CategoryLink)<{ active: boolean }>`
  padding: 8px;
  line-height: 24px;
  letter-spacing: -0.16px;
  color: ${(props) => (props.active ? colors.gray10 : colors.gray500)};

  ${textStyles.SUIT_16_B};
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 16px 8px;
`;

const Chip = styled(CategoryLink)<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? colors.gray10 : colors.gray800)};
  padding: 7px 14px;
  color: ${(props) => (props.active ? colors.gray950 : colors.gray50)};

  ${textStyles.SUIT_13_M}
`;
