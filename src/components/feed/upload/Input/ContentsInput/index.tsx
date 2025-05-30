import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ChangeEvent, forwardRef, Ref } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ContentsInputProp {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | null;
}

const ContentsInput = forwardRef(
  ({ onChange, value }: ContentsInputProp, ref: Ref<HTMLTextAreaElement> | undefined) => {
    return (
      <Contents
        placeholder='내용을 입력해주세요'
        maxLength={20000}
        spellCheck='false'
        onChange={onChange}
        ref={ref}
        value={value ?? ''}
      />
    );
  },
);

export default ContentsInput;

const Contents = styled(TextareaAutosize)`
  outline: none;
  background-color: transparent;
  width: 100%;
  overflow: hidden;
  resize: none;
  line-height: 26px;
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
`;
