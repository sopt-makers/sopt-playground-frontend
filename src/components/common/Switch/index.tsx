import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes } from 'react';

import { colors } from '@/styles/colors';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: { labelWidth: string; labelHeight: string; sliderWidth: string; sliderHeight: string };
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = { labelWidth: '30px', labelHeight: '18px', sliderWidth: '16.15px', sliderHeight: '15.75px' },
      className,
      ...props
    },
    ref,
  ) => {
    const translateX = `${
      Number(size.labelWidth.replace('px', '')) -
      Number(size.sliderWidth.replace('px', '')) -
      Number(size.labelHeight.replace('px', '')) / 12
    }px`;
    return (
      <StyledLabel width={size.labelWidth} height={size.labelHeight} className={className}>
        <StyledInput ref={ref} type='checkbox' translateX={translateX} {...props} />
        <StyledSlider width={size.sliderWidth} height={size.sliderHeight} className='slider' />
      </StyledLabel>
    );
  },
);

export default Switch;

const StyledLabel = styled.label<{ width: string; height: string }>`
  display: inline-block;
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const StyledInput = styled.input<{ translateX: string }>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background: ${colors.purple100};
  }

  &:checked + .slider::before {
    transform: translate(${(props) => props.translateX}, -50%);
  }

  &:focus + .slider {
    box-shadow: 0 2px 2px rgb(0 0 0 / 25%), 0 2px 2px rgb(0 0 0 / 25%);
  }
`;

const StyledSlider = styled.span<{ width: string; height: string }>`
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
    top: 50%;
    left: 1px;
    transform: translateY(-50%);
    transition: 0.2s;
    border-radius: 50%;
    background-color: ${colors.white};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    content: '';
  }
`;
