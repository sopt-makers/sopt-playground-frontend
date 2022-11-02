import styled from '@emotion/styled';
import { ReactNode } from 'react';

import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberFormItemProps {
  title: string;
  essential?: boolean;
  description?: string;
  children: ReactNode;
}

export default function MemberFormItem({ title, essential, description, children }: MemberFormItemProps) {
  return (
    <div>
      <StyledTitle>
        <div className='title'>{title}</div>
        {essential && <StyledEssential>*</StyledEssential>}
      </StyledTitle>
      {description && <StyledDescription>{description}</StyledDescription>}
      {children}
    </div>
  );
}

const StyledTitle = styled(Text)`
  display: flex;

  ${textStyles.SUIT_18_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_15_SB}
  }
`;

const StyledEssential = styled(Text)`
  margin: 0 0 0 4px;
  color: ${colors.purple100};
  ${textStyles.SUIT_16_M};
`;

const StyledDescription = styled(Text)`
  display: block;
  margin-top: 10px;
  color: ${colors.gray80};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    line-height: 150%;
    white-space: pre-line;

    ${textStyles.SUIT_13_M}
  }
`;
