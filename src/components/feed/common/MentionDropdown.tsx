import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Text from '@/components/common/Text';
import { fonts } from '@sopt-makers/fonts';
import { Ref, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { zIndex } from '@/styles/zIndex';
import ReactDOM from 'react-dom';
import { getMemberProfileById } from '@/api/endpoint_LEGACY/members';
import { useVirtualizer } from '@tanstack/react-virtual';

type Member = {
  generation: number;
  id: string | number;
  name: string;
  profileImage: string | null;
};

interface MentionDropdownProps {
  parentRef: RefObject<HTMLDivElement>;
  searchedMemberList: Member[];
  onSelect: (selected: Member) => void;
  mentionPosition: { x: number; y: number } | null;
}

const MentionDropdown = ({ parentRef, searchedMemberList, onSelect, mentionPosition }: MentionDropdownProps) => {
  if (!mentionPosition || searchedMemberList.length === 0) {
    return null;
  }

  const [adjustedPosition, setAdjustedPosition] = useState({
    x: mentionPosition.x,
    y: mentionPosition.y,
  });
  const [mobilePosition, setMobilePosition] = useState(0);
  const [memberParts, setMemberParts] = useState<Record<number, string>>({}); // 검색된 유저들의 파트 정보 관리
  const [viewportHeight, setViewportHeight] = useState(window.visualViewport?.height || window.innerHeight);

  // 가상화 세팅
  const scrollRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: searchedMemberList.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 62,
    overscan: 3,
  });

  // 요청 중인 ID들과 캐시를 관리하는 ref
  const pendingIds = useRef<Set<number>>(new Set());
  const memberPartsCache = useRef<Record<number, string>>({});

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.visualViewport?.height || window.innerHeight);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 데스크탑 드롭다운 위치 선정
  useEffect(() => {
    requestAnimationFrame(() => {
      if (!parentRef.current) return;

      const parentRect = parentRef.current.getBoundingClientRect();
      const dropdownRect = {
        width: 170,
        height: 16 + 62 * Math.min(searchedMemberList.length, 6),
      };
      const viewportHeight = window.innerHeight;

      let { x, y } = mentionPosition;

      if (x + dropdownRect.width > parentRect.right) x = parentRect.right - dropdownRect.width;
      if (y + dropdownRect.height > viewportHeight) y = y - dropdownRect.height - 22;
      setAdjustedPosition({ x, y });
    });
  }, [mentionPosition, parentRef, searchedMemberList]);

  // 모바일 드롭다운 위치 선정
  useEffect(() => {
    if (!parentRef.current) return;
    const parentRect = parentRef.current.getBoundingClientRect();
    const dropdownRect = {
      width: 170,
      height: 16 + 62 * Math.min(searchedMemberList.length, 3),
    };

    let { y } = mentionPosition;

    if (y + dropdownRect.height > window.innerHeight) y = y - dropdownRect.height - 22 - 16;
    else {
      y = y + 16;
      if (y + dropdownRect.height > viewportHeight) {
        const scrollAmount = y + dropdownRect.height - viewportHeight;
        window.scrollBy({
          top: scrollAmount,
          behavior: 'smooth',
        });
      }
    }
    setMobilePosition(y);
  }, [mentionPosition, parentRef, searchedMemberList, viewportHeight]);

  // 유저의 파트 정보를 가져오는 함수
  const fetchMemberPart = useCallback(async (id: number) => {
    if (memberPartsCache.current[id] !== undefined || pendingIds.current.has(id)) {
      return;
    }

    pendingIds.current.add(id);
    try {
      const profile = await getMemberProfileById(id);
      const part = profile?.soptActivities[0]?.part || ''; // 각 유저별로 파트 관리
      memberPartsCache.current[id] = part;

      // 배치 업데이트를 위해 requestAnimationFrame 사용
      requestAnimationFrame(() => {
        setMemberParts((prev) => ({
          ...prev,
          [id]: part,
        }));
      });
    } catch (e) {
      // 에러 발생하면 ''로 저장
      memberPartsCache.current[id] = '';
      requestAnimationFrame(() => {
        setMemberParts((prev) => ({
          ...prev,
          [id]: '',
        }));
      });
    } finally {
      pendingIds.current.delete(id);
    }
  }, []);

  const visibleItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    visibleItems.forEach((virtualItem) => {
      const member = searchedMemberList[virtualItem.index];
      const id = Number(member?.id);
      if (!member || !id) return;

      fetchMemberPart(id);
    });
  }, [visibleItems, searchedMemberList, fetchMemberPart]);

  useEffect(() => {
    // 검색어 바뀌면 스크롤 맨 위로
    rowVirtualizer.scrollToIndex(0, { align: 'start' });
  }, [searchedMemberList]);

  const getProfileImage = (profileImage: Member['profileImage']) => {
    if (profileImage === null || profileImage === '') {
      return '/icons/icon-member-search-default.svg';
    }
    return profileImage;
  };

  return ReactDOM.createPortal(
    <Container
      x={adjustedPosition.x}
      y={adjustedPosition.y}
      my={mobilePosition}
      role='listbox'
      aria-label='멘션할 멤버 선택'
    >
      <Wrapper ref={scrollRef}>
        <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const member = searchedMemberList[virtualRow.index];
            if (!member) return null;
            return (
              <Box
                key={member.id}
                onClick={() => {
                  onSelect(member);
                }}
                translateY={virtualRow.start}
                role='option'
                aria-label={`${member.name} 멘션하기`}
                tabIndex={0}
              >
                <ProfileImage src={getProfileImage(member.profileImage)} alt={`${member.name}-profileImage`} />
                <MemberInfo>
                  <MemberName typography='SUIT_16_M' color={colors.gray10}>
                    {member.name}
                  </MemberName>
                  <MemberDetail>{`${member.generation}기 ${memberParts[Number(member.id)] || ''}`}</MemberDetail>
                </MemberInfo>
              </Box>
            );
          })}
        </div>
      </Wrapper>
    </Container>,
    document.body,
  );
};

export default MentionDropdown;

const Container = styled.div<{ x: number; y: number; my: number }>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  z-index: ${zIndex.헤더};
  border: 1px solid ${colors.gray700};
  border-radius: 13px;
  background: ${colors.gray900};
  padding: 8px;
  width: 170px;

  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    top: ${(props) => props.my}px;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    border-radius: 20px;
    padding: 12px 8px;
    width: calc(100% - 16px);
  }
`;

const Wrapper = styled.div`
  max-height: calc(388px - 16px);
  overflow-x: auto;
  overflow-y: auto;

  @media ${MOBILE_MEDIA_QUERY} {
    max-height: calc(210px - 24px);
  }
`;

const Box = styled.button<{ translateY: number }>`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  gap: 12px;
  align-items: center;
  transform: ${({ translateY }) => `translateY(${translateY}px) `};
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 12px;
  width: 100%;
  height: 62px;

  &:hover {
    background-color: ${colors.gray700};
  }
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberName = styled(Text)`
  text-align: left;
`;

const MemberDetail = styled(Text)`
  text-align: left;
  color: ${colors.gray100};
  ${fonts.BODY_13_R};

  @media ${MOBILE_MEDIA_QUERY} {
    color: ${colors.gray200};
  }
`;
