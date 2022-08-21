import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import React, { FC, PropsWithChildren } from 'react';
import IconWarning from '@/public/icons/icon-warning.svg';
import styled from '@emotion/styled';
import Text from '@/components/common/Text';

export interface FormItemProps {
  errorMessage?: React.ReactNode;
}

const FormItem: FC<PropsWithChildren<FormItemProps>> = ({ children, errorMessage }) => {
  return (
    <StyledContainer>
      {children}
      {errorMessage && (
        <StyledErrorWrapper>
          <IconWarning />
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
  color: ${colors.red100};
  ${textStyles.SUIT_12_M}
`;
