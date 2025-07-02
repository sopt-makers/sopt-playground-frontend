import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Text from '@/components/common/Text';

type Member = {
  generation: number;
  id: string | number;
  name: string;
  profileImage: string | null;
};

interface MentionDropdownProps {
  searchedMemberList: Member[];
  onSelect: (selected: Member) => void;
}

const MentionDropdown = ({ searchedMemberList, onSelect }: MentionDropdownProps) => {
  if (searchedMemberList.length === 0) return null;

  const getProfileImage = (profileImage: Member['profileImage']) => {
    if (profileImage === null || profileImage === '') {
      return '/icons/icon-member-search-default.svg';
    }
    return profileImage;
  };

  return (
    <StyledList>
      {searchedMemberList.map((member) => (
        <StyledItem
          key={member.id}
          onClick={() => {
            onSelect(member);
          }}
        >
          <MemberInfo>
            <ProfileImage src={getProfileImage(member.profileImage)} alt={`${member.name}-profileImage`} />
            <Text color={colors.gray400}>{member.name}</Text>
          </MemberInfo>
          <Text>{`${member.generation}기`}</Text>
        </StyledItem>
      ))}
    </StyledList>
  );
};

export default MentionDropdown;

const StyledList = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 8px;
  border-radius: 6px;
  background: ${colors.gray700};
  padding: 8px 0;
  width: 170px;

  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    top: 49px;
    border: 1px solid ${colors.gray600};
  }
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.gray700};
  cursor: pointer;
  padding: 10px 16px;
  color: ${colors.gray600};

  &:hover {
    background-color: ${colors.gray600};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 135px;
  }
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  width: 20px;
  height: 20px;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
