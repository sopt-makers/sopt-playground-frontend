import styled from '@emotion/styled';
import * as Dialog from '@radix-ui/react-dialog';
import { colors } from '@sopt-makers/colors';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { textStyles } from '@/styles/typography';

interface ModalCloseButtonProps extends ComponentPropsWithoutRef<typeof Dialog.Close> {
  action?: 'normal' | 'close';
}

const ModalButton = forwardRef<HTMLButtonElement, ModalCloseButtonProps>(({ action = 'normal', ...props }, ref) => {
  const As = action === 'normal' ? 'button' : Dialog.Close;

  return <StyledButton ref={ref} as={As} {...props}></StyledButton>;
});

export default ModalButton;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${colors.gray700};
  padding: 12px 20px;
  height: 48px;
  color: ${colors.gray10};

  ${textStyles.SUIT_14_SB};
`;
