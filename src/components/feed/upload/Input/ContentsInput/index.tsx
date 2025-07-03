import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ChangeEvent, forwardRef, Ref, RefObject, useEffect, useRef } from 'react';

import { textStyles } from '@/styles/typography';
import MentionDropdown from '@/components/feed/common/MentionDropdown';
import useMention, { Member } from '@/components/feed/common/hooks/useMention';
import { parseHTMLToMentions, parseMentionsToHTML } from '@/components/feed/common/utils/parseMention';

interface ContentsInputProp {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | null;
}

const ContentsInput = forwardRef(({ onChange, value }: ContentsInputProp, ref: Ref<HTMLDivElement> | undefined) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const { isMentionOpen, searchedMemberList, handleMention, selectMention, mentionPosition } = useMention(editableRef);

  const handleContentsInput = () => {
    if (!editableRef.current) return;
    const html = editableRef.current.innerHTML;
    const parsed = parseHTMLToMentions(html);
    onChange({
      target: {
        value: parsed,
      },
    } as ChangeEvent<HTMLTextAreaElement>);
  };

  const handleSelectMention = (member: Member) => {
    selectMention(member);
    handleContentsInput();
  };

  useEffect(() => {
    if (!editableRef.current || value === null) return;

    const currentHTML = editableRef.current.innerHTML;
    const parsed = parseMentionsToHTML(value);

    if (currentHTML !== parsed) {
      editableRef.current.innerHTML = parsed;

      // 커서를 맨 뒤로 이동
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(editableRef.current);
        range.collapse(false);
        selection.addRange(range);
      }
    }
  }, [value]);

  return (
    <>
      <Contents
        contentEditable
        spellCheck='false'
        onInput={(e) => {
          handleMention();
          handleContentsInput();
        }}
        aria-label='내용을 입력해주세요'
        ref={editableRef}
        data-placeholder={editableRef.current?.innerText === '' ? '내용을 입력해주세요' : ''}
      />
      {isMentionOpen && (
        <MentionDropdown
          searchedMemberList={searchedMemberList}
          onSelect={handleSelectMention}
          mentionPosition={mentionPosition}
        />
      )}
    </>
  );
});

export default ContentsInput;

const Contents = styled.div`
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

  ::before {
    color: ${colors.gray600};
    content: attr(data-placeholder);
  }
`;
