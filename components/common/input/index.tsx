import React from 'react';
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes } from 'react';
import { colors } from 'styles/common/colors';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <StyledInput {...props} />;
});

export default Input;

const StyledInput = styled.input`
  box-sizing: border-box;
  border: 1.5px solid ${colors.black60};
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 20px;
  width: 100%;
  max-width: 100%;
  color: ${colors.white};
  font-size: 22px;

  &::placeholder {
    color: ${colors.gray100};
  }

  &:focus {
    outline: none;
    border-color: ${colors.purple100};
    background-color: ${colors.black80};
  }
`;
