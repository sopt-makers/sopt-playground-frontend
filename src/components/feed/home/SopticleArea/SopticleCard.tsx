import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { RecentSopticleType } from '@/api/endpoint/feed/getRecentSopticle';
import Text from '@/components/common/Text';
import FeedUrlCard from '@/components/feed/list/FeedUrlCard';

interface SopticleCardProps {
  sopticle: RecentSopticleType;
}

const SopticleCard = ({ sopticle }: SopticleCardProps) => {
  const profileImgSrc = sopticle.member.profileImage
    ? sopticle.member.profileImage
    : '/icons/icon-profile-fallback.svg';

  return (
    <CardContainer href={sopticle.sopticleUrl} target='_blank'>
      <CardHeader>
        <ProfileImage src={profileImgSrc} />
        <UserNameStyle>{sopticle.member.name}</UserNameStyle>
        <DotStyle>•</DotStyle>
        <SubTextStyle>
          {sopticle.member.activity.generation}기 {sopticle.member.activity.part}파트
        </SubTextStyle>
        <DotStyle>•</DotStyle>
        <SubTextStyle>{sopticle.createdAt}</SubTextStyle>
      </CardHeader>

      <FeedUrlCard
        title={sopticle.title}
        description={sopticle.content}
        thumbnailUrl=''
        sopticleUrl={sopticle.sopticleUrl}
        isFull
      />
    </CardContainer>
  );
};

const CardContainer = styled.a`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 12px;
  width: 100%;
  scroll-snap-align: start;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 22px;
`;

const ProfileImage = styled.img`
  margin-right: 8px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const UserNameStyle = styled(Text)`
  ${fonts.LABEL_14_SB}
`;

const DotStyle = styled(Text)`
  margin: 0 4px;
  color: ${colors.gray400};
  ${fonts.LABEL_14_SB}
`;

const SubTextStyle = styled(Text)`
  color: ${colors.gray400};
  ${fonts.LABEL_14_SB}
`;

export default SopticleCard;
