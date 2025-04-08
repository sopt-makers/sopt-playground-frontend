import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, useEffect, useState } from 'react';

import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import HorizontalScroller from '@/components/common/HorizontalScroller';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { CategoryLink, useCategoryParam } from '@/components/feed/common/queryParam';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { zIndex } from '@/styles/zIndex';

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

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);

    const handleUserInteraction = () => {
      setIsOpen(false);
    };

    window.addEventListener('scroll', handleUserInteraction, { once: true });
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  return (
    <>
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
                  onClick={() => onCategoryChange(category.id)}
                  categoryId={category.hasAllCategory ? category.id : category.tags.at(0)?.id ?? category.id} // 하위에 "전체" 카테고리가 없으면 태그의 첫 카테고리로 보내기
                  active={parentCategory?.id === category.id}
                >
                  {category.name}
                </Category>
              </LoggingClick>
            ))}
          </CategoryBox>
        </HorizontalScroller>
        {isOpen && (
          <Tooltip>
            <TooltipArrow />
            <TooltipContent>
              SOPT 회원들이 직접 작성한 아티클,{`\n`}이제 플레이그라운드에서도 볼 수 있어요!
            </TooltipContent>
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
    </>
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

const Tooltip = styled.div`
  position: absolute;
  top: 44px;
  left: 59px;
  z-index: ${zIndex.헤더};
`;

const TooltipArrow = styled.div`
  position: absolute;
  left: 16px;
  border-right: 5px solid transparent;
  border-bottom: 9px solid #3f3f47;
  border-left: 5px solid transparent;
  width: 0;
  height: 0;

  @media ${MOBILE_MEDIA_QUERY} {
    left: 20px;
  }
`;

const TooltipContent = styled.div`
  display: inline-flex;
  position: absolute;
  top: 9px;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  margin: 0;
  border-radius: 12px;

  /* Drop Shadow/200 */
  box-shadow: var(--sds-size-depth-0) var(--sds-size-depth-025) var(--sds-size-depth-100) var(--sds-size-depth-0)
      var(--sds-color-black-200),
    var(--sds-size-depth-0) var(--sds-size-depth-025) var(--sds-size-depth-100) var(--sds-size-depth-0)
      var(--sds-color-black-100);
  background: #3f3f47;
  padding: 12px 14px;
  min-width: 160px;
  ${textStyles.SUIT_13_M}

  line-height: 20px;
  white-space: pre;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px 18px;
  }
`;
