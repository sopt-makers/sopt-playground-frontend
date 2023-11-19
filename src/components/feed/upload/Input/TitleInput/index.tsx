import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface TitleInputProp {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TitleInput({ onChange }: TitleInputProp) {
  return <Title placeholder='(선택) 제목을 입력해주세요' maxLength={255} spellCheck='false' onChange={onChange} />;
}

const Title = styled(TextareaAutosize)`
  outline: none;
  background-color: transparent;
  width: 100%;
  resize: none;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  color: ${colors.gray10};

  ${textStyles.SUIT_24_B};

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${colors.gray600};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_20_B};
  }
`;
