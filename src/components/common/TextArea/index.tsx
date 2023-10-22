import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { forwardRef, TextareaHTMLAttributes, useState } from 'react';

import Text from '@/components/common/Text';
import { textStyles } from '@/styles/typography';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  count?: boolean;
  maxCount?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, count, maxCount, onChange, ...props }, ref) => {
    const [value, setValue] = useState<string>('');
    return (
      <>
        <StyledTextArea
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
  },
);

export default TextArea;

const StyledTextArea = styled.textarea<TextAreaProps>`
  transition: all 0.2s;
  border: 1.5px solid ${colors.black60};
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  width: 100%;
  resize: none;
  color: ${colors.gray10};
  ${textStyles.SUIT_16_M}

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
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;
