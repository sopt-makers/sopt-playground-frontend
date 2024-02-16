import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Meta } from '@storybook/react';

import Button from '@/components/common/Button';
import useModalState from '@/components/common/Modal/useModalState';
import CategorySelector from '@/components/feed/upload/Category/CategorySelector';
import { categories } from '@/components/feed/upload/Category/constants';
import { DropDown } from '@/components/feed/upload/Category/DropDown';
import { BasicCategory } from '@/components/feed/upload/Category/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default {
  component: CategorySelector,
} as Meta;

// MEMO: CategorySelector의 내용은 api 통신을 통해 가져오는 데이터가 포함되어있습니다.
// 스토리북에 띄워보기 위해 목데이터를 삽입하여 보여지도록 구현하였습니다.
export const Default = {
  render: function Render() {
    const { isOpen, onClose, onOpen } = useModalState();

    const feedData = {
      categoryId: 1,
      title: '제목',
      content: '내용',
      isQuestion: false,
      isBlindWriter: false,
      images: [],
    };

    return (
      <>
        <Button onClick={onOpen}>클릭하여 셀렉터 열기</Button>
        <DropDown isOpen={isOpen} onClose={onClose} className='category-drop' header={<Title>어디에 올릴까요?</Title>}>
          <Select>
            {categories &&
              categories.length > 0 &&
              categories.map((category: BasicCategory) => {
                return (
                  <Option
                    key={category.id}
                    onClick={() => {
                      console.log('click');
                    }}
                    isSelected={category.id === feedData.categoryId}
                  >
                    <OptionTitle>{category.name}</OptionTitle>
                    <OptionContents>{category.content}</OptionContents>
                  </Option>
                );
              })}
          </Select>
        </DropDown>
      </>
    );
  },

  name: '카테고리 셀렉터',
};

const OptionTitle = styled.h2`
  ${textStyles.SUIT_16_M};

  color: ${colors.white};
`;

const OptionContents = styled.p`
  text-align: left;
  ${textStyles.SUIT_12_R};

  color: ${colors.gray300};
`;

const Option = styled.button<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 6px;
  background-color: ${({ isSelected }) => isSelected && colors.gray700};
  cursor: pointer;
  padding: 12px;
  width: 100%;

  &:active {
    background-color: ${colors.gray700};
  }

  &:hover {
    background-color: ${colors.gray700};
  }
`;

const Select = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

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
