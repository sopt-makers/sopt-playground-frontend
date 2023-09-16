import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, TextareaHTMLAttributes, useState } from 'react';

import Text from '@/components/common/Text';
import { legacyColors } from '@/styles/colors';
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
            <Text color={legacyColors.gray100} typography='SUIT_12_M'>
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
  border: 1.5px solid ${legacyColors.black60};
  border-radius: 6px;
  background-color: ${legacyColors.black60};
  padding: 14px 20px;
  width: 100%;
  resize: none;
  color: ${legacyColors.white};
  ${textStyles.SUIT_16_M}

  &::placeholder {
    color: ${legacyColors.gray100};
  }

  &:focus {
    outline: none;
    border-color: ${legacyColors.purple100};
    background-color: ${legacyColors.black80};
  }

  ${({ error }) =>
    error &&
    css`
      border-color: ${legacyColors.red100};

      :focus {
        border-color: ${legacyColors.red100};
      }
    `}
`;

const StyledCountValue = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;
