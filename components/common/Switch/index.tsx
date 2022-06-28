import styled from '@emotion/styled';
import React, { FC, forwardRef, HTMLAttributes } from 'react';
import { colors } from '@/styles/colors';

interface SwitchProps extends HTMLAttributes<HTMLInputElement> {}

const Switch: FC<SwitchProps> = forwardRef<HTMLInputElement, SwitchProps>(({ ...props }, ref) => {
  return (
    <StyledLabel>
      <StyledInput ref={ref} type='checkbox' {...props} />
      <StyledSlider className='slider' />
    </StyledLabel>
  );
});

export default Switch;

const StyledLabel = styled.label`
  display: inline-block;
  position: relative;
  width: 30px;
  height: 18px;
`;

const StyledInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background: ${colors.purple100};
  }

  &:checked + .slider::before {
    transform: translateX(12px);
  }

  &:focus + .slider {
    box-shadow: 0 2px 2px rgb(0 0 0 / 25%), 0 2px 2px rgb(0 0 0 / 25%);
  }
`;

const StyledSlider = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: 0.2s;
  border-radius: 1000px;
  background-color: ${colors.gray80};
  cursor: pointer;

  &::before {
    position: absolute;
    bottom: 1px;
    left: 1px;
    transition: 0.2s;
    border-radius: 50%;
    background-color: ${colors.white};
    width: 16.15px;
    height: 15.75px;
    content: '';
  }
`;
