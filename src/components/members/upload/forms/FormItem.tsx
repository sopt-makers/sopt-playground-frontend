import styled from '@emotion/styled';
import WarningIcon from 'public/icons/icon-warning.svg';
import { ReactNode } from 'react';

import Text from '@/components/common/Text';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberFormItemProps {
  title: string;
  essential?: boolean;
  description?: string;
  errorMessage?: string;
  children: ReactNode;
  className?: string;
}

export default function MemberFormItem({
  title,
  essential,
  description,
  errorMessage,
  children,
  className,
}: MemberFormItemProps) {
  return (
    <div className={className}>
      <StyledTitle>
        <div className='title'>{title}</div>
        {essential && <StyledEssential>*</StyledEssential>}
      </StyledTitle>
      {description && <StyledDescription>{description}</StyledDescription>}
      {children}
      {errorMessage && (
        <StyledError>
          <WarningIcon />
          <StyledErrorMessage type='error'>{errorMessage}</StyledErrorMessage>
        </StyledError>
      )}
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
  color: ${legacyColors.purple100};
  ${textStyles.SUIT_16_M};
`;

const StyledDescription = styled(Text)`
  display: block;
  margin-top: 10px;
  color: ${legacyColors.gray80};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    line-height: 150%;
    white-space: pre-line;

    ${textStyles.SUIT_13_M}
  }
`;

const StyledError = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-top: 12px;
`;

const StyledErrorMessage = styled(Text)`
  display: block;
`;
