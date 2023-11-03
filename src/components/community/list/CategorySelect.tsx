import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import { CategoryLink, TagLink, useCategoryParam, useTagParam } from '@/components/community/queryParam';
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
  const currentCategory = categories.find((category) => category.id === currentCategoryId) ?? null;

  const [currentTagId] = useTagParam({ defaultValue: '' });

  return (
    <Container>
      <CategoryBox>
        <Category
          categoryId={undefined}
          active={currentCategoryId === ''}
          transformQuery={(query) => ({
            ...query,
            tag: undefined,
          })}
        >
          전체
        </Category>
        {categories.map((category) => (
          <Category
            categoryId={category.id}
            key={category.id}
            active={currentCategoryId === category.id}
            transformQuery={(query) => ({
              ...query,
              tag: category.hasAllCategory ? '' : category.tags.at(0)?.id ?? '',
            })}
          >
            {category.name}
          </Category>
        ))}
      </CategoryBox>
      {currentCategory && currentCategory.tags.length > 0 && (
        <TagBox>
          {currentCategory.hasAllCategory && (
            <Chip tagId={undefined} active={currentTagId === ''}>
              전체
            </Chip>
          )}
          {currentCategory.tags.map((tag, idx) => (
            <Chip key={tag.id} tagId={tag.id} active={tag.id === currentTagId}>
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
  gap: 6px;
  padding: 0 16px 8px;
`;

const Chip = styled(TagLink)<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? colors.gray10 : colors.gray800)};
  padding: 7px 14px;
  color: ${(props) => (props.active ? colors.gray950 : colors.gray50)};

  ${textStyles.SUIT_13_M}
`;
