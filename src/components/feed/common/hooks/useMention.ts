import { colors } from '@sopt-makers/colors';
import { useDebounce } from '@toss/react';
import { RefObject, useState } from 'react';

import useGetMembersByNameQuery from '@/components/projects/upload/hooks/useGetMembersByNameQuery';

export type Member = {
  generation: number;
  id: string | number;
  name: string;
  profileImage: string | null;
};

const useMention = (inputRef: RefObject<HTMLDivElement>) => {
  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState(''); // '@' 뒤에 오는 검색어
  const [mentionPosition, setMentionPosition] = useState<{ x: number; y: number } | null>(null); // '@' 위치
  const [isComposing, setIsComposing] = useState(false); // IME 입력 대기

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
    const { container, range, offset } = selectionInfo;

    if (container.nodeType !== Node.TEXT_NODE) {
      setIsMentionOpen(false);
      setMentionQuery('');
      return;
    }
    const textBeforeCursor = container.textContent?.slice(0, offset) ?? '';
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    const afterAtText = textBeforeCursor.substring(lastAtIndex + 1);

    if (lastAtIndex !== -1) {
      setIsMentionOpen(true);
      debouncedMentionQuery(afterAtText);

      // @ 위치 계산
      if (inputRef.current) {
        requestAnimationFrame(() => {
          const mentionRange = range.cloneRange();
          // offset 제한
          const maxOffset = container.textContent?.length ?? 0; // textContent보다 클 수 없도록
          const safeStart = Math.min(lastAtIndex, maxOffset);
          const safeEnd = Math.min(offset, maxOffset);

          mentionRange.setStart(container, safeStart);
          mentionRange.setEnd(container, safeEnd);

          const rect = mentionRange.getBoundingClientRect();
          setMentionPosition({
            x: rect.left + window.scrollX,
            y: rect.top + rect.height + window.scrollY,
          });
        });
      }
    } else {
      setIsMentionOpen(false);
      setMentionQuery('');
      setMentionPosition(null);
    }
  };

  const selectMention = ({ selectedMember, isReply = false }: { selectedMember: Member; isReply?: boolean }) => {
    if (!searchedMemberList) return;

    const mentionSpan = document.createElement('span');
    mentionSpan.textContent = `@${selectedMember.name}`;
    mentionSpan.setAttribute('data-id', String(selectedMember.id));
    mentionSpan.contentEditable = 'false';
    mentionSpan.style.color = `${colors.success}`;
    const spaceTextNode = document.createTextNode(' ');

    // 답글달기 시 입력창에 mention span 추가
    if (isReply && inputRef.current) {
      inputRef.current.focus();
      const fragment = document.createDocumentFragment();

      fragment.appendChild(mentionSpan);
      fragment.appendChild(spaceTextNode);

      const replyRange = document.createRange();
      replyRange.selectNodeContents(inputRef.current);
      replyRange.collapse(false);
      replyRange.insertNode(fragment);

      const selection = window.getSelection();
      if (selection) {
        const caretRange = document.createRange();
        caretRange.setStart(spaceTextNode, spaceTextNode.length);
        caretRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(caretRange);
      }

      setIsMentionOpen(false);
      setMentionQuery('');
      setMentionPosition(null);
      return;
    }

    // 일반적인 @멘션 선택 시 입력창에 mention span 추가
    const selectionInfo = getSelectionInfo();
    if (!selectionInfo) return;
    const { range, container, offset } = selectionInfo;

    const textBeforeCursor = container.textContent?.slice(0, offset) ?? '';
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      const mentionRange = range.cloneRange();
      mentionRange.setStart(container, lastAtIndex);
      mentionRange.setEnd(container, offset);
      mentionRange.deleteContents();

      range.insertNode(spaceTextNode);
      range.insertNode(mentionSpan);

      const selection = window.getSelection();
      if (selection) {
        range.setStartAfter(mentionSpan);
        range.setEndAfter(mentionSpan);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    setIsMentionOpen(false);
    setMentionQuery('');
    setMentionPosition(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      // 취소
      setIsMentionOpen(false);
      setMentionQuery('');
    } else if (e.key === 'Enter') {
      // 자동 선택
      // 멘션 목록이 오픈되어 있고 사용자가 입력을 마친 경우에만 실행
      if (!isComposing && isMentionOpen && searchedMemberList.length > 0) {
        selectMention({ selectedMember: searchedMemberList[0] });
        e.preventDefault();
      }
    }
  };

  return {
    isMentionOpen,
    searchedMemberList: isMentionOpen ? searchedMemberList : [],
    handleMention,
    selectMention,
    handleKeyDown,
    mentionPosition,
    setIsComposing,
  };
};

export default useMention;
