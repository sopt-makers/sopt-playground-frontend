import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface TitleInputProp {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  value: string | null;
}

export default function TitleInput({ onChange, onKeyDown, value }: TitleInputProp) {
  return (
    <Title
      placeholder='제목을 입력해주세요'
      maxLength={255}
      spellCheck='false'
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value ?? ''}
    />
  );
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
