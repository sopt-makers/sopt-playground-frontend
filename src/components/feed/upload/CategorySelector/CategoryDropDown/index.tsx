import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { Sheet } from '@/components/feed/upload/CategorySelector/common';
import { CATEGORY_OPTIONS } from '@/components/feed/upload/CategorySelector/constants';
import { CategorySelectorType } from '@/components/feed/upload/CategorySelector/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MainSelectorProps {
  isOpen?: boolean;
  onNext?: () => void;
  onClose: () => void;
}

export default function CategoryDropDown({ isOpen, onNext, onClose }: MainSelectorProps) {
  const handleSelectMain = () => {
    // TODO: 카테고리 저장 로직
    if (typeof onNext === 'function') {
      onNext();
    } else {
      onClose;
    }
  };

  return (
    <>
      {CATEGORY_OPTIONS.length > 0 && (
        <Sheet isOpen={isOpen} onClose={onClose} className='category-drop' header={<Title>어디에 올릴까요?</Title>}>
          <Select>
            {CATEGORY_OPTIONS.map(({ category, content }: CategorySelectorType) => {
              return (
                <Option key={category} onClick={handleSelectMain}>
                  <OptionTitle>{category}</OptionTitle>
                  <OptionContents>{content}</OptionContents>
                </Option>
              );
            })}
          </Select>
        </Sheet>
      )}
    </>
  );
}

const Title = styled.header`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    gap: 12px;
    align-items: center;

    ${textStyles.SUIT_20_B}

    padding: 0 20px 12px;
  }
`;

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
