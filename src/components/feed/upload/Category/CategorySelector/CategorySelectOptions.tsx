import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { CATEGORY_OPTIONS } from '@/components/feed/upload/Category/constants';
import { CategorySelectorType } from '@/components/feed/upload/Category/types';
import { textStyles } from '@/styles/typography';

interface CategorySelectOptionsProp {
  onNext?: () => void;
  onClose: () => void;
}

export default function CategorySelectOptions({ onNext, onClose }: CategorySelectOptionsProp) {
  const handleSelectCategory = () => {
    // TODO: 카테고리 저장 로직
    if (typeof onNext === 'function') {
      onNext();
    } else {
      onClose;
    }
  };

  return (
    <Select>
      {CATEGORY_OPTIONS.map(({ category, content }: CategorySelectorType) => {
        return (
          <Option key={category} onClick={handleSelectCategory}>
            <OptionTitle>{category}</OptionTitle>
            <OptionContents>{content}</OptionContents>
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
