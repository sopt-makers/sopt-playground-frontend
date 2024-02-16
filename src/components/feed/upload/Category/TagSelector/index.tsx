import styled from '@emotion/styled';

import { BottomSheet } from '@/components/common/BottomSheet';
import Responsive from '@/components/common/Responsive';
import useCategory from '@/components/feed/common/hooks/useCategory';
import { DropDown } from '@/components/feed/upload/Category/DropDown';
import TagSelectOptions from '@/components/feed/upload/Category/TagSelector/TagSelectOptions';
import { FeedDataType } from '@/components/feed/upload/types';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface TagSelectorProps {
  isOpen?: boolean;
  onBack: () => void;
  onClose: () => void;
  onSave: (categoryId: number) => void;
  feedData: FeedDataType;
}
export default function TagSelector({ isOpen = false, onBack, onClose, onSave, feedData }: TagSelectorProps) {
  const { findParentCategory } = useCategory();

  const parentCategory = findParentCategory(feedData.categoryId);

  return (
    <>
      <Responsive only='desktop'>
        <DropDown isOpen={isOpen} onClose={onClose} className='tag-drop'>
          <TagSelectOptions feedData={feedData} onClose={onClose} onSave={onSave} />
        </DropDown>
      </Responsive>
      <Responsive only='mobile'>
        <BottomSheet
          isOpen={isOpen}
          onClose={onClose}
          header={
            <Title>
              <BackArrowIc onClick={onBack} />
              {parentCategory && parentCategory.name}
            </Title>
          }
        >
          <TagSelectOptions feedData={feedData} onClose={onClose} onSave={onSave} />
        </BottomSheet>
      </Responsive>
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
