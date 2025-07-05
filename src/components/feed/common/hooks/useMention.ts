import useGetMembersByNameQuery from '@/components/projects/upload/hooks/useGetMembersByNameQuery';
import { useState, RefObject } from 'react';
import { useDebounce } from '@toss/react';
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

    const textBeforeCursor = container.textContent?.slice(0, offset) ?? '';
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    const afterAtText = textBeforeCursor.substring(lastAtIndex + 1);

    if (lastAtIndex !== -1) {
      setIsMentionOpen(true);
      debouncedMentionQuery(afterAtText);

      // @ 위치 계산
      if (inputRef.current) {
        const mentionRange = range.cloneRange();
        mentionRange.setStart(container, lastAtIndex);
        mentionRange.setEnd(container, offset);

        const rect = mentionRange.getBoundingClientRect();
        setMentionPosition({
          x: rect.left + window.scrollX,
          y: rect.top + rect.height + window.scrollY,
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

    const textBeforeCursor = container.textContent?.slice(0, offset) ?? '';
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      // '@' 부터 커서까지의 기존 검색어 삭제
      const mentionRange = range.cloneRange();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      // 취소
      setIsMentionOpen(false);
      setMentionQuery('');
    } else if (e.key === 'Enter') {
      // 자동 선택
      // 멘션 목록이 오픈되어 있고 사용자가 입력을 마친 경우에만 실행
      if (!isComposing && isMentionOpen && searchedMemberList.length > 0) {
        selectMention(searchedMemberList[0]);
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
