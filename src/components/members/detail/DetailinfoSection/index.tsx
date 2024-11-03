import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import dayjs from 'dayjs';

import { ProfileDetail } from '@/api/endpoint_LEGACY/members/type';
import Text from '@/components/common/Text';
import MemberDetailSection from '@/components/members/detail/ActivitySection/MemberDetailSection';
import InfoItem from '@/components/members/detail/InfoItem';
import { DEFAULT_DATE } from '@/components/members/upload/constants';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface DetailInfoSectionProps {
  profile: ProfileDetail;
  isCoffeechat?: boolean;
}

const convertBirthdayFormat = (birthday?: string) => {
  // FIXME: 서버쪽에 YYYY-MM-DD 형태로 무조건 업로드시 전송해줘야 하는 이슈가 있어서,
  // 생년월일을 보내지 않았을 경우에 DEFAULT_DATE를 전송하도록 임시처리 해 두었습니다. 이를 클라에서 보여주기 위해 대응합니다.
  if (birthday) {
    const isDefaultDay = dayjs(birthday).isSame(dayjs(DEFAULT_DATE));
    return isDefaultDay ? '' : dayjs(birthday).format('YYYY-MM-DD');
  }
  return '';
};

const DetailInfoSection = ({ profile, isCoffeechat = false }: DetailInfoSectionProps) => {
  const hasProfileInfo = profile.birthday || profile.university || profile.major || profile.address;

  return hasProfileInfo ? (
    <MemberDetailSection style={{ gap: '30px' }}>
      {!isCoffeechat && profile.birthday && (
        <InfoItem label='생년월일' content={convertBirthdayFormat(profile.birthday)} />
      )}
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
