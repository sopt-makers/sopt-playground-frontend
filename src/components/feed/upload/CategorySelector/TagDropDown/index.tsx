import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';
import SquareLink from '@/components/common/SquareLink';
import { Sheet } from '@/components/feed/upload/CategorySelector/common';
import { CATEGORY_OPTIONS } from '@/components/feed/upload/CategorySelector/constants';
import CheckIc from '@/public/icons/icon_check.svg';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
interface SubSelectorProps {
  isOpen?: boolean;
  onBack: () => void;
  onClose: () => void;
}

export default function TagDropDown({ isOpen, onBack, onClose }: SubSelectorProps) {
  const handleSelectSub = (option: string) => {
    // TODO: 태그 저장 로직
    onClose();
  };

  return (
    <>
      {CATEGORY_OPTIONS.length > 0 && (
        <Sheet
          isOpen={isOpen}
          onClose={onBack}
          header={
            <Title>
              <BackArrowIc onClick={onBack} />
              {CATEGORY_OPTIONS[4].category}
            </Title>
          }
          className='tag-drop'
        >
          <Select>
            {CATEGORY_OPTIONS[4].tags.map((tag) => {
              return (
                <Option key={tag} onClick={() => handleSelectSub(tag)}>
                  {tag}
                  <CheckIc />
                </Option>
              );
            })}
          </Select>
          <SubmitButton onClick={onClose}>
            <Responsive only='mobile'>
              <SquareLink variant='primary' size='medium'>
                확인
              </SquareLink>
            </Responsive>
          </SubmitButton>
        </Sheet>
      )}
    </>
  );
}

const BackArrowIc = styled(BackArrow)``;

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

const Select = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 24px;
  }
`;

const Option = styled.button`
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
