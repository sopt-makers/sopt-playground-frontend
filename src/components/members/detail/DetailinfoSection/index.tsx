import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { ProfileDetail } from '@/api/endpoint_LEGACY/members/type';
import Text from '@/components/common/Text';
import MemberDetailSection from '@/components/members/detail/ActivitySection/MemberDetailSection';
import InfoItem from '@/components/members/detail/InfoItem';

interface DetailInfoSectionProps {
  profile: ProfileDetail;
}

const DetailInfoSection = ({ profile }: DetailInfoSectionProps) => {
  const hasProfileInfo = profile.birthday || profile.university || profile.major || profile.address;

  return hasProfileInfo ? (
    <MemberDetailSection style={{ gap: '30px' }}>
      {profile.university && <InfoItem label='학교'>{profile.university}</InfoItem>}
      {profile.major && <InfoItem label='전공'>{profile.major}</InfoItem>}
      {profile.address && (
        <InfoItem label='활동 지역'>
          <StyledAddressBadgeWrapper>
            {profile.address.split(',').map((address) => (
              <AddressItem key={address}>
                <Text typography='SUIT_18_M'>{address}</Text>
              </AddressItem>
            ))}
          </StyledAddressBadgeWrapper>
        </InfoItem>
      )}
    </MemberDetailSection>
  ) : null;
};

export default DetailInfoSection;

const StyledAddressBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const AddressItem = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child)::after {
    display: inline-block;
    margin: 0 10px;
    background-color: ${colors.gray600};
    width: 1px;
    height: 16px;
    content: '';
  }
`;
