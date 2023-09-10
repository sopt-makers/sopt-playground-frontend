import styled from '@emotion/styled';

import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
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
    background-color: ${colors.black80};
    height: 1px;
  }
`;

const StyledEssential = styled(Text)`
  display: inline-block;
  transform: translateY(-10px);
  margin-bottom: 20px;
  margin-left: 4px;
  line-height: 8px;
  color: ${colors.purple100};
  font-size: 16px;
  font-weight: 500;
`;
