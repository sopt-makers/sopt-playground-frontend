import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ChangeEvent, forwardRef } from 'react';

import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberCountableTextAreaProps {
  error?: boolean;
  maxCount?: number;
  onChange: (e: ChangeEvent) => void;
  className?: string;
  placeholder?: string;
  value: string;
  containerStyle?: SerializedStyles;
}

export const MemberCountableTextArea = forwardRef<HTMLTextAreaElement, MemberCountableTextAreaProps>(
  ({ error, maxCount, onChange, className, placeholder, value, containerStyle }, ref) => {
    return (
      <StyledContainer customStyle={containerStyle}>
        <StyledTextArea
          onChange={onChange}
          error={error}
          ref={ref}
          maxLength={maxCount}
          placeholder={placeholder}
          value={value}
          className={className}
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

const StyledContainer = styled.div<{ customStyle?: SerializedStyles }>`
  position: relative;
  width: 100%;

  ${({ customStyle }) => customStyle}
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
  position: absolute;
  right: 25px;
  bottom: 15px;
  justify-content: flex-end;
  margin-top: 12px;

  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    right: 14px;
    bottom: 14px;
  }
`;
