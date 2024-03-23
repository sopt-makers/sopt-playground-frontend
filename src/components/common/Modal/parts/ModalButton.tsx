import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import { colors } from '@sopt-makers/colors';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { textStyles } from '@/styles/typography';
import { css } from '@emotion/react';

interface ModalCloseButtonProps extends ComponentPropsWithoutRef<typeof Dialog.Close> {
  action?: 'normal' | 'close';
  background?: 'dark' | 'light';
}

const ModalButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  ({ action = 'normal', background = 'dark', ...props }, ref) => {
    const As = action === 'normal' ? 'button' : Dialog.Close;

    return <StyledButton ref={ref} as={As} background={background} {...props}></StyledButton>;
  },
);

export default ModalButton;

const StyledButton = styled.button<{ background: 'dark' | 'light' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 12px 20px;
  height: 48px;

  ${({ background }) =>
    background === 'dark' &&
    css`
      background-color: ${colors.gray700};
      color: ${colors.gray10};
    `}
  ${({ background }) =>
    background === 'light' &&
    css`
      background-color: ${colors.white};
      color: ${colors.black};
    `}

  ${textStyles.SUIT_14_SB};
`;
