import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ContentsInputProp {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ContentsInput({ onChange }: ContentsInputProp) {
  return <Contents placeholder='내용을 입력해주세요' maxLength={20000} spellCheck='false' onChange={onChange} />;
}

const Contents = styled(TextareaAutosize)`
  outline: none;
  background-color: transparent;
  width: 100%;

  /* min-height: 100vw; */
  resize: none;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  color: ${colors.gray10};

  :focus {
    outline: none;
  }

  ${textStyles.SUIT_16_R};

  ::placeholder {
    color: ${colors.gray600};
  }
  @media ${MOBILE_MEDIA_QUERY} {
    min-height: 80px;
  }
`;
