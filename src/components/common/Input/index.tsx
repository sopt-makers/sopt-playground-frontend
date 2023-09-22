import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, FocusEvent, forwardRef } from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

export interface InputProps {
  className?: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  count?: boolean;
  maxCount?: number;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  pattern?: string;
  autoFocus?: boolean;
  width?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      name,
      value,
      error,
      errorMessage,
      count,
      maxCount,
      disabled,
      pattern,
      placeholder,
      autoFocus,
      onChange,
      onBlur,
      type = 'text',
      width = '100%',
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <StyledInput
          value={value}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          error={error || !!errorMessage}
          disabled={disabled}
          pattern={pattern}
          ref={ref}
          autoFocus={autoFocus}
          width={width}
        />
        {errorMessage !== undefined || !!count ? (
          <Additional>
            <StyledErrorMessage message={errorMessage} />
            <div>
              {count && (
                <StyledCountValue>
                  <Text color={colors.gray100} typography='SUIT_12_M'>
                    {`${value?.length ?? 0}/${maxCount}`}
                  </Text>
                </StyledCountValue>
              )}
            </div>
          </Additional>
        ) : null}
      </div>
    );
  },
);

export default Input;

const StyledInput = styled.input<InputProps>`
  box-sizing: border-box;
  transition: all 0.2s;
  border: 1.5px solid ${colors.black60};
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  width: ${(props) => props.width};
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

const StyledErrorMessage = styled(ErrorMessage)`
  margin-top: 11px;
`;

const Additional = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledCountValue = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;
