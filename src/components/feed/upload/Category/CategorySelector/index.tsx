import styled from '@emotion/styled';

import { BottomSheet } from '@/components/common/BottomSheet';
import Responsive from '@/components/common/Responsive';
import CategorySelectOptions from '@/components/feed/upload/Category/CategorySelector/CategorySelectOptions';
import { CATEGORY_OPTIONS } from '@/components/feed/upload/Category/constants';
import { DropDown } from '@/components/feed/upload/Category/DropDown';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface CategorySelectorProps {
  isOpen?: boolean;
  onNext?: () => void;
  onClose: () => void;
}

export default function CategorySelector({ isOpen, onNext, onClose }: CategorySelectorProps) {
  return (
    <>
      {CATEGORY_OPTIONS.length > 0 && (
        <>
          <Responsive only='desktop'>
            <DropDown
              isOpen={isOpen}
              onClose={onClose}
              className='category-drop'
              header={<Title>어디에 올릴까요?</Title>}
            >
              <CategorySelectOptions onNext={onNext} onClose={onClose} />
            </DropDown>
          </Responsive>
          <Responsive only='mobile'>
            <BottomSheet
              isOpen={isOpen}
              onClose={onClose}
              className='category-drop'
              header={<Title>어디에 올릴까요?</Title>}
            >
              <CategorySelectOptions onNext={onNext} onClose={onClose} />
            </BottomSheet>
          </Responsive>
        </>
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
