import useGetMembersByNameQuery from '@/components/projects/upload/hooks/useGetMembersByNameQuery';
import { useState, RefObject } from 'react';
import { useDebounce } from '@toss/react';
import getCaretCoordinates from 'textarea-caret';
import { colors } from '@sopt-makers/colors';

export type Member = {
  generation: number;
  id: string | number;
  name: string;
  profileImage: string | null;
};

const useMention = (inputRef: RefObject<HTMLDivElement>) => {
  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState(''); // '@' 뒤에 오는 검색어
  const [mentionPosition, setMentionPosition] = useState({ x: 0, y: 0 }); // '@' 위치

  const debouncedMentionQuery = useDebounce((value) => {
    setMentionQuery(value);
  }, 500);

  const { data: searchedMemberList = [] } = useGetMembersByNameQuery({
    name: isMentionOpen ? mentionQuery : '',
  });

  const getSelectionInfo = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    const container = range.startContainer;
    const offset = range.startOffset;

    return { selection, range, container, offset };
  };

  const handleMention = () => {
    const selectionInfo = getSelectionInfo();
    if (!selectionInfo) return;
    const { container, offset } = selectionInfo;

    const textBeforeCursor = container.textContent?.slice(0, offset) ?? '';
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    const afterAtText = textBeforeCursor.substring(lastAtIndex + 1);

    if (lastAtIndex !== -1) {
      setIsMentionOpen(true);
      debouncedMentionQuery(afterAtText);

      // @ 위치 계산
      if (inputRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        setMentionPosition({
          x: inputRect.left,
          y: inputRect.top + inputRect.height,
        });
      }
    } else {
      setIsMentionOpen(false);
      setMentionQuery('');
    }
  };

  const selectMention = (selectedMember: Member) => {
    const selectionInfo = getSelectionInfo();
    if (!selectionInfo) return;
    const { range, container, offset } = selectionInfo;

    const textBeforeCursor = container.textContent ?? '';
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      // '@' 부터 커서까지의 기존 검색어 삭제
      const mentionRange = document.createRange();
      mentionRange.setStart(container, lastAtIndex);
      mentionRange.setEnd(container, offset);
      mentionRange.deleteContents();

      // 선택한 사용자 추가
      const mentionSpan = document.createElement('span');
      mentionSpan.textContent = `@${selectedMember.name}`;
      mentionSpan.setAttribute('data-id', String(selectedMember.id));
      mentionSpan.contentEditable = 'false';
      mentionSpan.style.color = `${colors.success}`;
      range.insertNode(mentionSpan);
    }
    setIsMentionOpen(false);
    setMentionQuery('');
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
