import styled from '@emotion/styled';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import { css } from '@emotion/react';

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const TextArea: FC<PropsWithChildren<TextAreaProps>> = ({ error, ...props }) => {
  return <StyledTextArea error={error} {...props}></StyledTextArea>;
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
