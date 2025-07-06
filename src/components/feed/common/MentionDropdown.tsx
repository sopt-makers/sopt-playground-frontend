import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Text from '@/components/common/Text';
import { fonts } from '@sopt-makers/fonts';
import { Ref, RefObject, useEffect, useRef, useState } from 'react';
import { zIndex } from '@/styles/zIndex';
import ReactDOM from 'react-dom';
import { getMemberProfileById } from '@/api/endpoint_LEGACY/members';

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
  mentionPosition: { x: number; y: number };
}

const MentionDropdown = ({ parentRef, searchedMemberList, onSelect, mentionPosition }: MentionDropdownProps) => {
  const [adjustedPosition, setAdjustedPosition] = useState({
    x: mentionPosition.x,
    y: mentionPosition.y,
  });
  const [mobilePosition, setMobilePosition] = useState(0);
  const [memberParts, setMemberParts] = useState<Record<number, string>>({}); // 검색된 유저들의 파트 정보 관리

  useEffect(() => {
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
  }, [mentionPosition, parentRef, searchedMemberList]);

  useEffect(() => {
    if (!parentRef.current) return;
    const parentRect = parentRef.current.getBoundingClientRect();
    const dropdownRect = {
      width: 170,
      height: 16 + 62 * Math.min(searchedMemberList.length, 3),
    };
    const viewportHeight = window.innerHeight;

    let { y } = mentionPosition;

    if (y + dropdownRect.height > viewportHeight) y = y - dropdownRect.height - 22 - 16;
    else {
      y = y + 16;
    }
    setMobilePosition(y);
  }, [mentionPosition, parentRef, searchedMemberList, window.innerHeight]);

  useEffect(() => {
    const fetchParts = async () => {
      const parts: Record<number, string> = {};
      await Promise.all(
        searchedMemberList.map(async (member) => {
          const profile = await getMemberProfileById(Number(member.id));
          parts[Number(member.id)] = profile.soptActivities[0]?.part || ''; // 각 유저별로 파트 관리
        }),
      );
      setMemberParts(parts);
    };

    if (searchedMemberList.length > 0) {
      fetchParts();
    }
  }, [searchedMemberList]);

  if (searchedMemberList.length === 0) return null;

  const getProfileImage = (profileImage: Member['profileImage']) => {
    if (profileImage === null || profileImage === '') {
      return '/icons/icon-member-search-default.svg';
    }
    return profileImage;
  };

  return ReactDOM.createPortal(
    <Container x={adjustedPosition.x} y={adjustedPosition.y} my={mobilePosition}>
      <Wrapper>
        {searchedMemberList.map((member) => (
          <Box
            key={member.id}
            onClick={() => {
              onSelect(member);
            }}
          >
            {memberParts[Number(member.id)] && (
              <>
                <ProfileImage src={getProfileImage(member.profileImage)} alt={`${member.name}-profileImage`} />
                <MemberInfo>
                  <MemberName typography='SUIT_16_M' color={colors.gray10}>
                    {member.name}
                  </MemberName>
                  <MemberDetail>{`${member.generation}기 ${memberParts[Number(member.id)] || ''}`}</MemberDetail>
                </MemberInfo>
              </>
            )}
          </Box>
        ))}
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
  overflow-y: auto;

  @media ${MOBILE_MEDIA_QUERY} {
    max-height: calc(210px - 24px);
  }
`;

const Box = styled.button`
  display: flex;
  gap: 12px;
  align-items: center;
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
  font: ${fonts.BODY_13_R};

  @media ${MOBILE_MEDIA_QUERY} {
    color: ${colors.gray200};
  }
`;
