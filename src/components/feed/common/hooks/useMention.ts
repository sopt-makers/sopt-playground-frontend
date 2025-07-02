import useGetMembersByNameQuery from '@/components/projects/upload/hooks/useGetMembersByNameQuery';
import { useState, useEffect } from 'react';
import { useDebounce } from '@toss/react';

type Member = {
  generation: number;
  id: string | number;
  name: string;
  profileImage: string | null;
};

const useMention = () => {
  const [isMentionOpen, setIsMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState(''); // '@' 뒤에 오는 검색어
  const [currentContent, setCurrentContent] = useState(''); // 현재 입력창의 전체 내용

  const debouncedMentionQuery = useDebounce((value) => {
    setMentionQuery(value);
  }, 500);

  const { data: searchedMemberList = [] } = useGetMembersByNameQuery({
    name: isMentionOpen ? mentionQuery : '',
  });

  const handleMention = (value: string) => {
    setCurrentContent(value); // 현재 입력된 전체 내용을 저장

    const lastAtIndex = value.lastIndexOf('@'); // 마지막으로 나타난 '@'의 인덱스
    const afterAtText = value.substring(lastAtIndex + 1); // 이름 검색어

    if (lastAtIndex !== -1) {
      setIsMentionOpen(true);
      setMentionQuery(afterAtText); // '@' 뒤의 내용을 검색어로 설정
    } else if (isMentionOpen && !value.includes('@')) {
      // '@'를 사라졌지웠을 경우
      setIsMentionOpen(false);
      setMentionQuery('');
    } else if (isMentionOpen && lastAtIndex !== -1) {
      // 검색어가 변경된 경우
      setMentionQuery(afterAtText);
    } else {
      setIsMentionOpen(false);
      setMentionQuery('');
    }
  };

  const selectMention = (selectedMember: Member) => {
    if (currentContent === null) return;

    const lastAtIndex = currentContent.lastIndexOf('@');
    if (lastAtIndex !== -1) {
      const textBeforeAt = currentContent.substring(0, lastAtIndex);
      const newContent = `${textBeforeAt}@${selectedMember.name} `; // 선택 후 공백 추가
      setCurrentContent(newContent); // content 업데이트
      setIsMentionOpen(false); // 드롭다운 닫기
      setMentionQuery(''); // 검색어 초기화

      return newContent;
    }
    return currentContent;
  };

  return {
    isMentionOpen,
    searchedMemberList: isMentionOpen ? searchedMemberList : [],
    handleMention,
    selectMention,
    contentToUpdate: currentContent,
  };
};

export default useMention;
