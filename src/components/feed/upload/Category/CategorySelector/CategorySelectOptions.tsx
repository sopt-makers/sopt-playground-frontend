import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { BasicCategory } from '@/components/feed/upload/Category/types';
import { FeedDataType } from '@/components/feed/upload/types';
import { textStyles } from '@/styles/typography';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
interface CategorySelectOptionsProp {
  onSave: (categoryId: number) => void;
  feedData: FeedDataType;
}

export default function CategorySelectOptions({ onSave, feedData }: CategorySelectOptionsProp) {
  const handleSelectCategory = (categoryId: number) => {
    onSave(categoryId);
  };

  const { data: categories } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  return (
    <Select>
      {categories &&
        categories.length > 0 &&
        categories.map((category: BasicCategory) => {
          return (
            <Option
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              isSelected={category.id === feedData.categoryId}
            >
              <OptionTitle>{category.name}</OptionTitle>
              <OptionContents>{category.content}</OptionContents>
            </Option>
          );
        })}
    </Select>
  );
}

const OptionTitle = styled.h2`
  ${textStyles.SUIT_16_M};

  line-height: 22px;
  color: ${colors.white};
`;

const OptionContents = styled.p`
  text-align: left;
  ${textStyles.SUIT_12_R};

  line-height: 20px;
  color: ${colors.gray300};
`;

const Option = styled.button<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
  border-radius: 6px;
  background-color: ${({ isSelected }) => isSelected && colors.gray700};
  cursor: pointer;
  padding: 12px;
  width: 100%;

  &:active {
    background-color: ${colors.gray700};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${colors.gray700};
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 8px;
  }
`;

const Select = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;
