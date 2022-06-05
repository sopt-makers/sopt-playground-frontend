import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes } from 'react';
import { colors } from '@/styles/colors';
import { textStyles } from 'styles/common/typography';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <StyledInput {...props} />;
});

export default Input;

const StyledInput = styled.input`
  box-sizing: border-box;
  transition: all 0.2s;
  border: 1.5px solid ${colors.black60};
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  width: 100%;
  color: ${colors.white};
  ${textStyles.SUIT_16_M};

  &::placeholder {
    color: ${colors.gray100};
  }

  &:focus {
    outline: none;
    border-color: ${colors.purple100};
    background-color: ${colors.black80};
  }
`;
