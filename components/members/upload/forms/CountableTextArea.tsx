import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, TextareaHTMLAttributes, useState } from 'react';

import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberCountableTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  maxCount?: number;
}

export const MemberCountableTextArea = forwardRef<HTMLTextAreaElement, MemberCountableTextAreaProps>(
  ({ error, maxCount, onChange, className, ...props }, ref) => {
    const [value, setValue] = useState<string>('');
    return (
      <StyledContainer className={className}>
        <StyledTextArea
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
export default MemberCountableTextArea;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledTextArea = styled.textarea<MemberCountableTextAreaProps>`
  transition: all 0.2s;
  border: 1.5px solid ${colors.black60};
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  width: 100%;
  height: 100%;
  resize: none;
  color: ${colors.white};
  ${textStyles.SUIT_16_M}

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

  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    right: 14px;
    bottom: 14px;
  }
`;
