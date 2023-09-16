import styled from '@emotion/styled';
import React, { FC, PropsWithChildren } from 'react';

import Text from '@/components/common/Text';
import IconWarning from '@/public/icons/icon-warning.svg';
import { legacyColors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

export interface ErrorMessageProps {
  className?: string;
  message?: React.ReactNode;
}

const ErrorMessage: FC<PropsWithChildren<ErrorMessageProps>> = ({ className, message }) => {
  return (
    <StyledErrorWrapper className={className}>
      {message && (
        <>
          <IconWarning />
          <StyledErrorMessage>{message}</StyledErrorMessage>
        </>
      )}
    </StyledErrorWrapper>
  );
};

export default ErrorMessage;

const StyledErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 16px;

  & > svg {
    margin-right: 6px;
  }
`;

const StyledErrorMessage = styled(Text)`
  white-space: pre-line;
  color: ${legacyColors.red100};

  ${textStyles.SUIT_12_M}
`;
