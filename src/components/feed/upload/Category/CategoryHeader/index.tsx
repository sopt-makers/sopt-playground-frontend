import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Dispatch, SetStateAction } from 'react';

import Arrow from '@/public/icons/icon-select-arrow.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface CategoryHeaderProp {
  categoryId: number;
  setIsDropDown: Dispatch<SetStateAction<'categoryOpen' | 'tagOpen' | 'allClosed'>>;
}

export default function CategoryHeader({ categoryId, setIsDropDown }: CategoryHeaderProp) {
  const handleOpenDropDown = () => {
    setIsDropDown('categoryOpen');
  };

  return (
    <CategorySelectorStarter onClick={handleOpenDropDown}>
      {/* TODO: categoryId 따라 내용 변경 구현 */}
      <UploadTitle>어디에 올릴까요?</UploadTitle>
      <OpenArrow fill='white' />
    </CategorySelectorStarter>
  );
}

const UploadTitle = styled.h1`
  ${textStyles.SUIT_16_M}

  color: ${colors.white};
`;

const OpenArrow = styled(Arrow)`
  width: 14px;
  height: 14px;
`;

const CategorySelectorStarter = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px 12px;
  width: 154px;

  &:hover {
    border-radius: 8px;
    background-color: ${colors.gray800};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 14px 16px;
    width: 100%;
  }
`;
