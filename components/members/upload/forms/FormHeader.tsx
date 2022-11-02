import styled from '@emotion/styled';

import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function MemberFormHeader({ title }: { title: string }) {
  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      <StyledLine />
    </>
  );
}

const StyledTitle = styled.h2`
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
