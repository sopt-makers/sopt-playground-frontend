import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Text from '@/components/common/Text';
import { fonts } from '@sopt-makers/fonts';

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
    <Container>
      {searchedMemberList.map((member) => (
        <Wrapper
          key={member.id}
          onClick={() => {
            onSelect(member);
          }}
        >
          <ProfileImage src={getProfileImage(member.profileImage)} alt={`${member.name}-profileImage`} />
          <MemberInfo>
            <MemberName typography='SUIT_16_M' color={colors.gray10}>
              {member.name}
            </MemberName>
            <MemberDetail>{`${member.generation}기`}</MemberDetail>
          </MemberInfo>
        </Wrapper>
      ))}
    </Container>
  );
};

export default MentionDropdown;

const Container = styled.div`
  border: 1px solid ${colors.gray700};
  border-radius: 13px;
  background: ${colors.gray900};
  padding: 8px;
  width: 170px;

  @media ${MOBILE_MEDIA_QUERY} {
    border: none;
    border-radius: 20px;
    width: 100%;
    max-width: 358px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 12px;
  width: 100%;

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

const MemberName = styled(Text)``;

const MemberDetail = styled(Text)`
  color: ${colors.gray100};
  font: ${fonts.BODY_13_R};

  @media ${MOBILE_MEDIA_QUERY} {
    color: ${colors.gray200};
  }
`;
