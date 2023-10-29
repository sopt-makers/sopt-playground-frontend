import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Sheet from '@/components/feed/upload/CategorySelector/common';
import { isMobile, MAIN_OPTIONS } from '@/components/feed/upload/CategorySelector/constants';
import { MainSelectorType } from '@/components/feed/upload/CategorySelector/types';
import { textStyles } from '@/styles/typography';

interface MainSelectorProps {
  isOpen?: boolean;
  onNext?: () => void;
  onClose: () => void;
}

export default function CategoryDropDown({ isOpen, onNext, onClose }: MainSelectorProps) {
  const handleSelectMain = () => {
    // 카테고리 저장 로직
    if (typeof onNext === 'function') {
      onNext();
    } else {
      onClose;
    }
  };

  return (
    <>
      <Sheet isOpen={isOpen} onClose={onClose} width={366} title={isMobile ? '어디에 올릴까요?' : ''}>
        <Select>
          {MAIN_OPTIONS.map(({ title, content }: MainSelectorType) => {
            return (
              <Option key={title} onClick={handleSelectMain}>
                <OptionTitle>{title}</OptionTitle>
                <OptionContents>{content}</OptionContents>
              </Option>
            );
          })}
        </Select>
      </Sheet>
    </>
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

const Option = styled.article`
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
