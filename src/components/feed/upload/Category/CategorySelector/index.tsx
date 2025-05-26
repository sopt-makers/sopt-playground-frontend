import styled from '@emotion/styled';

import { BottomSheet } from '@/components/common/BottomSheet';
import Responsive from '@/components/common/Responsive';
import CategorySelectOptions from '@/components/feed/upload/Category/CategorySelector/CategorySelectOptions';
import { DropDown } from '@/components/feed/upload/Category/DropDown';
import { FeedDataType } from '@/components/feed/upload/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface CategorySelectorProps {
  isOpen?: boolean;
  onClose: () => void;
  onSelect: (categoryId: number) => void;
  feedData: FeedDataType;
}

export default function CategorySelector({ isOpen = false, onClose, onSelect, feedData }: CategorySelectorProps) {
  return (
    <>
      <Responsive only='desktop'>
        <DropDown isOpen={isOpen} onClose={onClose} className='category-drop' header={<Title>어디에 올릴까요?</Title>}>
          <CategorySelectOptions onSave={onSelect} feedData={feedData} />
        </DropDown>
      </Responsive>
      <Responsive only='mobile'>
        <BottomSheet
          isOpen={isOpen}
          onClose={onClose}
          className='category-drop'
          header={<Title>어떤 게시판에 올릴까요?</Title>}
        >
          <CategorySelectOptions onSave={onSelect} feedData={feedData} />
        </BottomSheet>
      </Responsive>
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
