import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { categories } from '@/components/feed/upload/Category/constants';
import { CategorySelectType } from '@/components/feed/upload/Category/types';
import { textStyles } from '@/styles/typography';

interface CategorySelectOptionsProp {
  onNext: () => void;
  onSave: (categoryId: number) => void;
}

export default function CategorySelectOptions({ onSave, onNext }: CategorySelectOptionsProp) {
  const handleSelectCategory = (categoryId: number) => {
    onSave(categoryId);
    onNext();
  };

  return (
    <Select>
      {categories.length > 0 &&
        categories.map((category: CategorySelectType) => {
          return (
            <Option key={category.id} onClick={() => handleSelectCategory(category.id)}>
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

const Option = styled.button`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 6px;
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
