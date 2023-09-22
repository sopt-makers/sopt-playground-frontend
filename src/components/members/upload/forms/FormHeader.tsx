import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberFormHeaderProps {
  title: string;
  essential?: boolean;
}

export default function MemberFormHeader({ title, essential }: MemberFormHeaderProps) {
  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      {essential && <StyledEssential>*</StyledEssential>}
      <StyledLine />
    </>
  );
}

const StyledTitle = styled.h2`
  display: inline;
  color: ${colors.gray10};

  ${textStyles.SUIT_24_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_18_B};
  }
`;

const StyledLine = styled.hr`
  margin-top: 20px;
  margin-bottom: 0;
  border: none;
  background-color: ${colors.black60};
  width: 100%;
  height: 1.5px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
    background-color: ${colors.black60};
    height: 1px;
  }
`;

const StyledEssential = styled(Text)`
  display: inline-block;
  transform: translateY(-10px);
  margin-bottom: 20px;
  margin-left: 4px;
  line-height: 8px;
  color: ${colors.orange100};
  font-size: 16px;
  font-weight: 500;
`;
