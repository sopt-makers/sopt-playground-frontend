import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, forwardRef } from 'react';

import Text from '@/components/common/Text';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberCountableTextAreaProps {
  error?: boolean;
  maxCount?: number;
  onChange: (e: ChangeEvent) => void;
  className?: string;
  placeholder?: string;
  value: string;
}

export const MemberCountableTextArea = forwardRef<HTMLTextAreaElement, MemberCountableTextAreaProps>(
  ({ error, maxCount, onChange, className, placeholder, value }, ref) => {
    return (
      <StyledContainer className={className}>
        <StyledTextArea
          onChange={onChange}
          error={error}
          ref={ref}
          maxLength={maxCount}
          placeholder={placeholder}
          value={value}
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
