import styled from '@emotion/styled';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {}

const TextArea: FC<PropsWithChildren<TextAreaProps>> = ({ ...props }) => {
  return <StyledTextArea {...props}></StyledTextArea>;
};
export default TextArea;

const StyledTextArea = styled.textarea`
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
`;
