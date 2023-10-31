import styled from '@emotion/styled';

import { BottomSheet } from '@/components/common/BottomSheet';
import Responsive from '@/components/common/Responsive';
import { CATEGORY_OPTIONS } from '@/components/feed/upload/Category/constants';
import { DropDown } from '@/components/feed/upload/Category/DropDown';
import TagSelectOptions from '@/components/feed/upload/Category/TagSelector/TagSelectOptions';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface TagSelectorProps {
  isOpen?: boolean;
  onBack: () => void;
  onClose: () => void;
}

export default function TagSelector({ isOpen, onBack, onClose }: TagSelectorProps) {
  return (
    <>
      {CATEGORY_OPTIONS.length > 0 && (
        <>
          <Responsive only='desktop'>
            <DropDown isOpen={isOpen} onClose={onBack} className='tag-drop'>
              <TagSelectOptions onClose={onClose} />
            </DropDown>
          </Responsive>
          <Responsive only='mobile'>
            <BottomSheet
              isOpen={isOpen}
              onClose={onBack}
              header={
                <Title>
                  <BackArrowIc onClick={onBack} />
                  {CATEGORY_OPTIONS[4].category}
                </Title>
              }
            >
              <TagSelectOptions onClose={onClose} />
            </BottomSheet>
          </Responsive>
        </>
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
