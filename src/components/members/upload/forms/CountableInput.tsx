import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ChangeEvent, forwardRef } from 'react';

import Text from '@/components/common/Text';
import { textStyles } from '@/styles/typography';

export interface MemberCountableInputProps {
  error?: boolean;
  maxCount: number;
  value: string;
  onChange: (e: ChangeEvent) => void;
  className?: string;
  placeholder?: string;
}

export const MemberCountableInput = forwardRef<HTMLInputElement, MemberCountableInputProps>(
  ({ error, maxCount, onChange, value, className, placeholder }, ref) => {
    return (
      <StyledContainer className={className}>
        <StyledInput
          value={value}
          onChange={onChange}
          error={error}
          ref={ref}
          maxLength={maxCount}
          placeholder={placeholder}
        />
        <StyledCountValue>
          <Text color={colors.gray100} typography='SUIT_12_M'>
            {`${value?.length ?? 0}/${maxCount}`}
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
  color: ${colors.white100};
  ${textStyles.SUIT_16_M};

  &::placeholder {
    color: ${colors.gray100};
  }

  &:focus {
    outline: none;
    border-color: ${colors.gray40};
    background-color: ${colors.black80};
  }

  ${({ error }) =>
    error &&
    css`
      border-color: ${colors.error};

      :focus {
        border-color: ${colors.error};
      }
    `}
`;

const StyledCountValue = styled.div`
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
`;
