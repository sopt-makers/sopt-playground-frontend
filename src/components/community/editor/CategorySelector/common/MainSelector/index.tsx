import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Sheet from '@/components/community/editor/CategorySelector/common';
import { MAIN_OPTIONS } from '@/components/community/editor/CategorySelector/constants';
import { MainSelectorType } from '@/components/community/editor/CategorySelector/types';
import { textStyles } from '@/styles/typography';

interface MainSelectorProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function MainSelector({ isOpen, onClose }: MainSelectorProps) {
  const isMobile = window.innerWidth <= 768;

  const handleMoveToNextSection = () => {
    // 다음 단계로 이동 과정
    onClose();
  };

  return (
    <>
      <Sheet isOpen={isOpen} onClose={onClose} title={isMobile ? '어디에 올릴까요?' : ''}>
        <Select>
          {MAIN_OPTIONS.map(({ title, content }: MainSelectorType) => {
            return (
              <Option key={title} onClick={handleMoveToNextSection}>
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
  ${textStyles.SUIT_16_M}

  color:${colors.white}
`;

const OptionContents = styled.p`
  ${textStyles.SUIT_12_R}

  color:${colors.gray300}
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
