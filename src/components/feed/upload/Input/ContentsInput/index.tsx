import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ChangeEvent, forwardRef, Ref, RefObject } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { textStyles } from '@/styles/typography';
import MentionDropdown from '@/components/feed/common/MentionDropdown';
import useMention from '@/components/feed/common/hooks/useMention';

interface ContentsInputProp {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | null;
}

const ContentsInput = forwardRef(
  ({ onChange, value }: ContentsInputProp, ref: Ref<HTMLTextAreaElement> | undefined) => {
    const { isMentionOpen, searchedMemberList, handleMention, selectMention, handleMentionEsc, contentToUpdate } =
      useMention(ref as RefObject<HTMLTextAreaElement>);

    const handleContentsInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      handleMention(e);
      onChange;
    };

    return (
      <>
        <Contents
          placeholder='내용을 입력해주세요'
          maxLength={20000}
          spellCheck='false'
          onChange={handleContentsInput}
          onKeyDown={handleMentionEsc}
          ref={ref}
          value={contentToUpdate ?? ''}
        />
        {isMentionOpen && <MentionDropdown searchedMemberList={searchedMemberList} onSelect={selectMention} />}
      </>
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
