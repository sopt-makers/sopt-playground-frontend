import styled from '@emotion/styled';
import { Meta } from '@storybook/react';

import { BottomSheet } from '@/components/common/BottomSheet';
import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';
import Responsive from '@/components/common/Responsive';
import SquareLink from '@/components/common/SquareLink';
import useCategory from '@/components/feed/common/hooks/useCategory';
import { categories } from '@/components/feed/upload/Category/constants';
import TagSelector from '@/components/feed/upload/Category/TagSelector';
import { BasicCategory } from '@/components/feed/upload/Category/types';
import CheckIcon from '@/public/icons/icon_check.svg';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default {
  component: TagSelector,
} as Meta;

export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    const handleEvent = () => {
      console.log('event');
    };

    const parentCategory = categories[1];
    const feedData = {
      categoryId: 2,
      title: '제목',
      content: '내용',
      isQuestion: false,
      isBlindWriter: false,
      images: [],
    };
    const { findChildrenCategory } = useCategory();
    const isInitial = findChildrenCategory(feedData.categoryId);

    return (
      <>
        <Button onClick={onOpen}>클릭하여 셀렉터 열기</Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={onClose}
          header={
            <Title>
              <BackArrowIc onClick={handleEvent} />
              {parentCategory && parentCategory.name}
            </Title>
          }
        >
          <Select>
            {parentCategory && parentCategory.children.length > 0 && (
              <>
                {parentCategory.hasAll && (
                  <Option onClick={handleEvent}>주제 선택 안 함{!isInitial && <CheckIcon />}</Option>
                )}
                <>
                  {parentCategory.children.map((tag: BasicCategory) => {
                    return (
                      <Option key={tag.id} onClick={handleEvent}>
                        {tag.name}
                        {tag.id === feedData.categoryId && <CheckIcon />}
                      </Option>
                    );
                  })}
                </>
              </>
            )}
          </Select>
          <SubmitButton onClick={() => onClose()}>
            <Responsive only='mobile'>
              <SquareLink variant='primary' size='medium'>
                확인
              </SquareLink>
            </Responsive>
          </SubmitButton>
        </BottomSheet>
      </>
    );
  },

  name: '태그 셀렉터',
};

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
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 0 8px;
  width: 100%;
`;
