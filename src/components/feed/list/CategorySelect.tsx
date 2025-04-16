import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, useRef } from 'react';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import HorizontalScroller from '@/components/common/HorizontalScroller';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { CategoryLink, useCategoryParam } from '@/components/feed/common/queryParam';
import Tooltip from '@/components/feed/list/FeedCategoryTooltip/index';
import { useTooltip } from '@/components/feed/list/FeedCategoryTooltip/useTooltip';
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

  const sopticleCategoryRef = useRef<HTMLAnchorElement>(null);

  const TOOLTIP_NAME = '솝티클';
  const { tooltipPosition, isOpen, closeTooltipForToday } = useTooltip(
    sopticleCategoryRef,
    'categoryTooltipClosedDate',
  );

  return (
    <Container>
      <HorizontalScroller>
        <CategoryBox>
          <LoggingClick
            eventKey='feedListCategoryFilter'
            param={{
              category: '전체',
            }}
          >
            <Category categoryId={undefined} active={currentCategoryId === ''} onClick={() => onCategoryChange('')}>
              전체
            </Category>
          </LoggingClick>
          {categories.map((category) => (
            <LoggingClick key={category.id} eventKey='feedListCategoryFilter' param={{ category: category.name }}>
              <Category
                onClick={() => {
                  if (category.name === TOOLTIP_NAME) {
                    closeTooltipForToday();
                  }
                  onCategoryChange(category.id);
                }}
                categoryId={category.hasAllCategory ? category.id : category.tags.at(0)?.id ?? category.id} // 하위에 "전체" 카테고리가 없으면 태그의 첫 카테고리로 보내기
                active={parentCategory?.id === category.id}
                ref={category.name === TOOLTIP_NAME ? sopticleCategoryRef : null} // 툴팁이 필요한 카테고리에만 Ref 설정
              >
                {category.name}
              </Category>
            </LoggingClick>
          ))}
        </CategoryBox>
      </HorizontalScroller>
      {isOpen && (
        <Tooltip tooltipPosition={tooltipPosition}>
          <Tooltip.Content>
            <Tooltip.Header>
              <Tooltip.Title>NEW!</Tooltip.Title>
              <Tooltip.Close onClick={closeTooltipForToday} />
            </Tooltip.Header>
            SOPT 회원들이 직접 작성한 아티클,{`\n`}이제 플레이그라운드에서도 볼 수 있어요!
          </Tooltip.Content>
        </Tooltip>
      )}
      {parentCategory && parentCategory.tags.length > 0 && (
        <HorizontalScroller css={{ marginBottom: '12px' }}>
          <TagBox>
            {parentCategory.hasAllCategory && (
              <LoggingClick eventKey='feedListCategoryFilter' param={{ category: '전체' }}>
                <Chip categoryId={parentCategory.id} active={parentCategory.id === currentCategoryId}>
                  전체
                </Chip>
              </LoggingClick>
            )}
            {parentCategory.tags.map((tag) => (
              <LoggingClick key={tag.id} eventKey='feedListCategoryFilter' param={{ category: tag.name }}>
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
  padding: 4px 8px;
`;

export const Category = styled(CategoryLink)<{ active: boolean }>`
  flex-shrink: 0;
  padding: 8px;
  line-height: 24px;
  letter-spacing: -0.16px;
  color: ${(props) => (props.active ? colors.gray10 : colors.gray500)};

  ${textStyles.SUIT_16_B};

  &:hover {
    transition: 0.2s;
    color: ${(props) => !props.active && colors.gray400};
  }
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

  &:hover {
    transition: 0.2s;
    background-color: ${(props) => !props.active && colors.gray700};
  }
`;
