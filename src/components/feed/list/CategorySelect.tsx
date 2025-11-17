import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { FC, useRef } from 'react';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import HorizontalScroller from '@/components/common/HorizontalScroller';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { CategoryLink, useCategoryParam } from '@/components/feed/common/queryParam';
import IconHot from '@/public/icons/icon_fire.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
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
  onCategoryChange: (categoryId: string) => void;
}

const CategorySelect: FC<CategorySelectProps> = ({ categories, onCategoryChange }) => {
  const [currentCategoryId] = useCategoryParam({ defaultValue: '' });
  const parentCategory =
    categories.find(
      (category) => category.id === currentCategoryId || category.tags.some((tag) => tag.id === currentCategoryId),
    ) ?? null;

  return (
    <Container>
      <HorizontalScroller>
        <CategoryBox>
          <LoggingClick
            eventKey='feedListCategoryFilter'
            param={{
              category: 'HOT', // TODO: 알맞은 이벤트 로깅으로 수정하기
            }}
          >
            <Category categoryId={undefined} active={currentCategoryId === ''} onClick={() => onCategoryChange('')}>
              {currentCategoryId === '' && <IconHot />}
              HOT
            </Category>
          </LoggingClick>
          {categories.map((category) => (
            <LoggingClick key={category.id} eventKey='feedListCategoryFilter' param={{ category: category.name }}>
              <Category
                onClick={() => {
                  onCategoryChange(category.id);
                }}
                categoryId={category.hasAllCategory ? category.id : category.tags.at(0)?.id ?? category.id} // 하위에 "전체" 카테고리가 없으면 태그의 첫 카테고리로 보내기
                active={parentCategory?.id === category.id}
              >
                {category.name}
              </Category>
            </LoggingClick>
          ))}
        </CategoryBox>
      </HorizontalScroller>
      {parentCategory && parentCategory.tags.length > 0 && (
        <HorizontalScroller css={{ marginBottom: '12px' }}>
          <TagBox>
            {parentCategory.hasAllCategory && (
              <Chip categoryId={parentCategory.id} active={parentCategory.id === currentCategoryId}>
                전체
              </Chip>
            )}
            {parentCategory.tags.map((tag) => (
              <LoggingClick
                key={tag.id}
                eventKey='feedListCategoryFilter'
                param={{ category: `${parentCategory.name}_${tag.name}` }}
              >
                <Chip
                  key={tag.id}
                  categoryId={tag.id}
                  active={tag.id === currentCategoryId}
                  onClick={() => onCategoryChange(tag.id)}
                >
                  {tag.name}
                </Chip>
              </LoggingClick>
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
`;

export const CategoryBox = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 16px 8px;
`;

export const Category = styled(CategoryLink)<{ active: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  gap: 2px;
  align-items: center;
  border-bottom: ${(props) => (props.active ? `2px solid ${colors.gray30}` : '2px solid transparent')};
  padding-bottom: 6px;
  ${fonts.HEADING_16_B};

  line-height: 24px;
  letter-spacing: -0.16px;
  color: ${(props) => (props.active ? colors.gray10 : colors.gray500)};

  &:hover {
    transition: 0.2s;
    color: ${(props) => !props.active && colors.gray400};
  }
`;

const TagBox = styled.div`
  display: flex;
  gap: 6px;
  padding: 8px 16px 0;
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

  &:hover {
    transition: 0.2s;
    background-color: ${(props) => !props.active && colors.gray700};
  }
`;
