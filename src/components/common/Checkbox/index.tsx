import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes } from 'react';

import IconCheck from '@/public/icons/icon-check.svg';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ checked = false, ...props }, ref) => {
  return (
    <StyledLabel>
      <input ref={ref} type='checkbox' {...props} />
      <StyledCheckbox checked={checked}>{checked && <IconCheck />}</StyledCheckbox>
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
  border: 1px solid ${legacyColors.gray100};
  border-radius: 4px;
  background-color: transparent;
  width: 22.5px;
  height: 22.5px;
  ${({ checked }) =>
    checked &&
    css`
      border: 1px solid ${legacyColors.purple80};
      background-color: ${legacyColors.purple100};
    `}

  & > svg {
    width: 14px;
    height: 9px;
    color: ${legacyColors.purple60};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 17.5px;
    height: 17.5px;
  }
`;
