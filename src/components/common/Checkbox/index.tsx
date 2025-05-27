import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { forwardRef, InputHTMLAttributes } from 'react';

import IconCheck from '@/public/icons/icon-check.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ checked = false, size = 'medium', ...props }, ref) => {
  return (
    <StyledLabel>
      <input ref={ref} type='checkbox' {...props} />
      <StyledCheckbox checked={checked} size={size}>
        {checked && <IconCheck />}
      </StyledCheckbox>
    </StyledLabel>
  );
});

export default Checkbox;

const StyledLabel = styled.label`
  cursor: pointer;

  input[type='checkbox'] {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
  }
`;

const StyledCheckbox = styled.span<CheckboxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s background-color;
  border: 1px solid ${colors.gray600};
  border-radius: 4px;
  background-color: ${colors.gray500};
  width: 22.5px;
  height: 22.5px;

  & > svg {
    width: 14px;
    height: 9px;
    color: ${colors.gray10};
  }

  ${({ size }) =>
    size === 'small'
      ? css`
          width: 16px;
          height: 16px;
          & > svg {
            width: 10px;
            height: 6.5px;
          }
        `
      : size === 'medium' &&
        css`
          width: 20px;
          height: 20px;
        `}

  ${({ checked }) =>
    checked &&
    css`
      border: 1px solid ${colors.blue300};
      background-color: ${colors.success};
    `}

  @media ${MOBILE_MEDIA_QUERY} {
    width: 17.5px;
    height: 17.5px;

    ${({ size }) =>
      size === 'medium' &&
      css`
        width: 20px;
        height: 20px;
      `}
  }
`;
