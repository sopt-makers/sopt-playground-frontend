import styled from '@emotion/styled';
import { FC, PropsWithChildren, TextareaHTMLAttributes, useState } from 'react';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import { css } from '@emotion/react';
import Text from '@/components/common/Text';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  count?: boolean;
  maxCount?: number;
}

const TextArea: FC<PropsWithChildren<TextAreaProps>> = ({ count, maxCount, error, ...props }) => {
  const [value, setValue] = useState<string>('');
  return (
    <>
      <StyledTextArea value={value} onChange={(e) => setValue(e.target.value)} error={error} {...props} />
      {count && (
        <StyledCountValue>
          <Text color={colors.gray100} typography='SUIT_12_M'>
            {`${value.length}/${maxCount}`}
          </Text>
        </StyledCountValue>
      )}
    </>
  );
};
export default TextArea;

const StyledTextArea = styled.textarea<TextAreaProps>`
  transition: all 0.2s;
  border: 1.5px solid ${colors.black60};
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  width: 100%;
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
`;
