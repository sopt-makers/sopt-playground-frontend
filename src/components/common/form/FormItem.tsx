import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconAlertCircle } from '@sopt-makers/icons';
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';

import Text from '@/components/common/Text';
import { textStyles } from '@/styles/typography';

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  errorMessage?: React.ReactNode;
}

const FormItem: FC<PropsWithChildren<FormItemProps>> = ({ children, errorMessage, ...props }) => {
  return (
    <StyledContainer {...props}>
      {children}
      {errorMessage && (
        <StyledErrorWrapper>
          <StyledIconAlertCircle color={colors.error} />
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        </StyledErrorWrapper>
      )}
    </StyledContainer>
  );
};

export default FormItem;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 11px;

  & > svg {
    margin-right: 6px;
  }
`;

const StyledErrorMessage = styled(Text)`
  color: ${colors.error};
  ${textStyles.SUIT_12_M}
`;

const StyledIconAlertCircle = styled(IconAlertCircle)`
  width: 14px;
  height: 14px;
`;
