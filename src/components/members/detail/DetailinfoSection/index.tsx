import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { ProfileDetail } from '@/api/endpoint_LEGACY/members/type';
import Text from '@/components/common/Text';
import MemberDetailSection from '@/components/members/detail/ActivitySection/MemberDetailSection';
import InfoItem from '@/components/members/detail/InfoItem';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

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
              <AddressBadge key={address}>
                <Text typography='SUIT_14_M'>{address}</Text>
              </AddressBadge>
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
  gap: 8px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 10px;
  }
`;

const AddressBadge = styled.div`
  border-radius: 13px;
  background-color: ${colors.gray700};
  padding: 6px 14px;
  line-height: 16px;
  color: ${colors.gray10};
`;
