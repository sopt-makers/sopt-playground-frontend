import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

export interface MemberCountableInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  maxCount: number;
}

export const MemberCountableInput = forwardRef<HTMLInputElement, MemberCountableInputProps>(
  ({ error, maxCount, onChange, className, ...props }, ref) => {
    const [value, setValue] = useState<string>('');

    return (
      <StyledContainer className={className}>
        <StyledInput
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e);
          }}
          error={error}
          ref={ref}
          maxLength={maxCount}
          {...props}
        />
        <StyledCountValue>
          <Text color={colors.gray100} typography='SUIT_12_M'>
            {`${value.length}/${maxCount}`}
          </Text>
        </StyledCountValue>
      </StyledContainer>
    );
  },
);

export default MemberCountableInput;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<Omit<MemberCountableInputProps, 'maxCount'>>`
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
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
`;
