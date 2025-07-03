import useGetMembersByNameQuery from '@/components/projects/upload/hooks/useGetMembersByNameQuery';
import { useState, RefObject } from 'react';
import { useDebounce } from '@toss/react';
import getCaretCoordinates from 'textarea-caret';

export type Member = {
  generation: number;
  id: string | number;
  name: string;
  profileImage: string | null;
};

const useMention = (inputRef: RefObject<HTMLTextAreaElement>) => {
  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState(''); // '@' 뒤에 오는 검색어
  const [currentContent, setCurrentContent] = useState(''); // 현재 입력창의 전체 내용
  const [mentionPosition, setMentionPosition] = useState({ x: 0, y: 0 }); // '@' 위치

  const debouncedMentionQuery = useDebounce((value) => {
    setMentionQuery(value);
  }, 500);

  const { data: searchedMemberList = [] } = useGetMembersByNameQuery({
    name: isMentionOpen ? mentionQuery : '',
  });

  const handleMention = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCurrentContent(value);
    const cursorPos = e.target.selectionStart; // 커서 위치
    if (cursorPos === null) return;

    const textBeforeCursor = value.slice(0, cursorPos); // 커서 앞쪽 문자열만 slice
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    const afterAtText = textBeforeCursor.substring(lastAtIndex + 1);

    if (lastAtIndex !== -1) {
      setIsMentionOpen(true);
      debouncedMentionQuery(afterAtText);

      // @ 위치 계산
      if (inputRef.current) {
        const coordinates = getCaretCoordinates(inputRef.current, lastAtIndex);
        const inputRect = inputRef.current.getBoundingClientRect();
        setMentionPosition({
          x: inputRect.left + coordinates.left,
          y: inputRect.top + coordinates.top + coordinates.height,
        });
      }
    } else {
      setIsMentionOpen(false);
      setMentionQuery('');
    }
  };

  const selectMention = (selectedMember: Member) => {
    if (currentContent === null || !inputRef.current) return;

    const textarea = inputRef.current;
    const cursorPos = textarea.selectionStart;
    if (cursorPos == null) return;

    const textBeforeCursor = currentContent.slice(0, cursorPos);
    const textAfterCursor = currentContent.slice(cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      const textBeforeAt = textBeforeCursor.substring(0, lastAtIndex);
      const newMention = `@${selectedMember.name}`;
      const newContent = textBeforeAt + newMention + textAfterCursor;
      setCurrentContent(newContent);
      setIsMentionOpen(false);
      setMentionQuery('');

      // 커서를 멘션 뒤로 이동
      const newCursorPos = textBeforeAt.length + newMention.length;
      requestAnimationFrame(() => {
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      });

      return newContent;
    }
    return currentContent;
  };

  const handleMentionEsc = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setIsMentionOpen(false);
      setMentionQuery('');
    }
  };

  return {
    isMentionOpen,
    searchedMemberList: isMentionOpen ? searchedMemberList : [],
    handleMention,
    selectMention,
    handleMentionEsc,
    mentionPosition,
  };
};

export default useMention;
