import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { BasicCategory } from '@/components/feed/upload/Category/types';
import { UploadFeedDataType } from '@/components/feed/upload/types';
import { textStyles } from '@/styles/typography';

interface CategorySelectOptionsProp {
  onNext: () => void;
  onSave: (categoryId: number) => void;
  feedData: UploadFeedDataType;
}

export default function CategorySelectOptions({ onSave, onNext, feedData }: CategorySelectOptionsProp) {
  const handleSelectCategory = (categoryId: number) => {
    onSave(categoryId);
    onNext();
  };

  const { data: categories } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  return (
    <Select>
      {categories?.length > 0 &&
        categories.map((category: BasicCategory) => {
          return (
            <Option
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              isSelected={category.id === feedData.mainCategoryId}
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

  color: ${colors.white};
`;

const OptionContents = styled.p`
  ${textStyles.SUIT_12_R};

  color: ${colors.gray300};
`;

const Option = styled.button<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 6px;
  background-color: ${({ isSelected }) => isSelected && colors.gray700};
  cursor: pointer;
  padding: 12px;
  width: 100%;

  &:active {
    background-color: ${colors.gray700};
  }
`;

const Select = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;
