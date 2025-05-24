import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';

import { RecentSopticleType } from '@/api/endpoint/feed/getRecentSopticle';
import Text from '@/components/common/Text';
import { SOPTICLE_CATEGORY_ID } from '@/components/feed/constants';
import FeedUrlCard from '@/components/feed/list/FeedUrlCard';

interface SopticleCardProps {
  sopticle: RecentSopticleType;
}

const SopticleCard = ({ sopticle }: SopticleCardProps) => {
  const { id, sopticleUrl, member, createdAt, title, content, images } = sopticle;
  const profileImgSrc = member.profileImage ? member.profileImage : '/icons/icon-profile-fallback.svg';

  return (
    <CardContainer href={`/?category=${SOPTICLE_CATEGORY_ID}&feed=${id}`}>
      <CardHeader>
        <ProfileImage src={profileImgSrc} />
        <UserNameStyle>{member.name}</UserNameStyle>
        <DotStyle>•</DotStyle>
        <SubTextStyle>
          {member.activity.generation}기 {member.activity.part}파트
        </SubTextStyle>
        <DotStyle>•</DotStyle>
        <SubTextStyle>{createdAt}</SubTextStyle>
      </CardHeader>

      <FeedUrlCard title={title} description={content} thumbnailUrl={images[0]} sopticleUrl={sopticleUrl} isFull />
    </CardContainer>
  );
};

const CardContainer = styled(Link)`
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
