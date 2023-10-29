import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';
import SquareLink from '@/components/common/SquareLink';
import Sheet from '@/components/feed/upload/CategorySelector/common';
import { isMobile, SUB_OPTIONS } from '@/components/feed/upload/CategorySelector/constants';
import CheckIc from '@/public/icons/icon_check.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface SubSelectorProps {
  isOpen?: boolean;
  onBack: () => void;
  onClose: () => void;
}

export default function TagDropDown({ isOpen, onBack, onClose }: SubSelectorProps) {
  const handleSelectSub = (option: string) => {
    // 옵션 저장 로직
    onClose();
  };

  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={onBack}
        title={isMobile ? SUB_OPTIONS[0].title : undefined}
        isBack={isMobile ? true : false}
        width={160}
        onBack={onBack}
      >
        <Select>
          {SUB_OPTIONS[0].options.map((option) => {
            return (
              <Option key={option} onClick={() => handleSelectSub(option)}>
                {option}
                <CheckIc />
              </Option>
            );
          })}
        </Select>
        <SubmitButton>
          <Responsive only='mobile'>
            <SquareLink variant='primary' size='medium'>
              확인
            </SquareLink>
          </Responsive>
        </SubmitButton>
      </Sheet>
    </>
  );
}

const Select = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 24px;
  }
`;

const Option = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 12px;
`;

const SubmitButton = styled.button`
  padding: 0 8px;
  width: 100%;
`;
