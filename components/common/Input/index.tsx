import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  count?: boolean;
  maxCount?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, count, maxCount, onChange, ...props }, ref) => {
  const [value, setValue] = useState<string>('');

  return (
    <>
      <StyledInput
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e);
        }}
        error={error}
        ref={ref}
        {...props}
      />
      {count && (
        <StyledCountValue>
          <Text color={colors.gray100} typography='SUIT_12_M'>
            {`${value.length}/${maxCount}`}
          </Text>
        </StyledCountValue>
      )}
    </>
  );
});

export default Input;

const StyledInput = styled.input<InputProps>`
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

  ${({ error }) =>
    error &&
    css`
      border-color: ${colors.red100};

      :focus {
        border-color: ${colors.red100};
      }
    `}
`;

const StyledCountValue = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;
