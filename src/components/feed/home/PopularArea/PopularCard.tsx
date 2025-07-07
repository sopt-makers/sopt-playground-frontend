import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconEye } from '@sopt-makers/icons';
import { Skeleton } from '@sopt-makers/ui';

import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import { IconMember } from '@/components/feed/common/Icon';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface PopularCardProps {
  rank: number;
  card?: {
    id: number;
    category: string;
    title: string;
    hits: number;
    member: {
      name: string;
      profileImage: string | null;
    };
  };
  isLoading?: boolean;
  onClick?: () => void;
}

interface FeedInfoProps {
  titleBox?: boolean;
  authorBox?: boolean;
}

const PopularSkeleton = ({ rank }: { rank: number }) => {
  return (
    <PopularCardWrapper>
      <Text typography='SUIT_18_SB' color={colors.white} lineHeight={24} style={{ width: '16px' }}>
        {rank}
      </Text>
      <FeedInfo titleBox>
        <Tag>
          <Skeleton width={20} height={14} color={colors.gray700} />
        </Tag>
        <TitleText typography='SUIT_14_SB' color={colors.white} lineHeight={18}>
          <Skeleton width={300} height={18} color={colors.gray700} />
        </TitleText>
      </FeedInfo>
      <FeedInfo authorBox>
        <IconMember size={20} />
        <Text typography='SUIT_14_SB' color={colors.gray50} lineHeight={18}>
          <Skeleton width={40} height={18} color={colors.gray700} />
        </Text>
      </FeedInfo>
      <HitsInfo>
        <HitsIcon />
        <Text typography='SUIT_14_SB' color={colors.gray400} lineHeight={18}>
          <Skeleton width={25} height={18} color={colors.gray700} />
        </Text>
      </HitsInfo>
    </PopularCardWrapper>
  );
};

const PopularCard = ({ rank, card, isLoading, onClick }: PopularCardProps) => {
  if (isLoading || !card) return <PopularSkeleton rank={rank} />;

  const { category, title, hits, member } = card;
  const { name, profileImage } = member;

  return (
    <PopularCardWrapper onClick={onClick} role='button'>
      <Text typography='SUIT_18_SB' color={colors.white} lineHeight={24} style={{ width: '16px' }}>
        {rank}
      </Text>
      <FeedInfo titleBox>
        <Tag>{category}</Tag>
        <TitleText typography='SUIT_14_SB' color={colors.white} lineHeight={18}>
          {title || '제목 없는 게시글'}
        </TitleText>
      </FeedInfo>
      <FeedInfo authorBox>
        {profileImage ? (
          <ProfileImage width={20} height={20} src={profileImage} alt={name} />
        ) : (
          <IconMember size={20} />
        )}
        <NameText typography='SUIT_14_SB' color={colors.gray50} lineHeight={18}>
          {name}
        </NameText>
      </FeedInfo>
      <HitsInfo>
        <HitsIcon />
        <Text typography='SUIT_14_SB' color={colors.gray400} lineHeight={18}>
          {hits}
        </Text>
      </HitsInfo>
    </PopularCardWrapper>
  );
};

export default PopularCard;

const PopularCardWrapper = styled.li`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s ease;
  border-radius: 12px;
  background: ${colors.gray900};
  cursor: pointer;
  padding: 16px;
  width: 100%;

  &:hover {
    background: ${colors.gray800};
  }
`;

const FeedInfo = styled.div<FeedInfoProps>`
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 0;

  ${({ titleBox }) =>
    titleBox &&
    `      
    flex: 1;

    @media ${MOBILE_MEDIA_QUERY} {
      flex-basis: calc(100% - 16px - 12px);
    }
  `}

  ${({ authorBox }) =>
    authorBox &&
    `
    width: 124px;
    flex-shrink: 0;

    @media ${MOBILE_MEDIA_QUERY} {
        width: calc(100% - 54px - 12px);
    }
  `}
`;

const ProfileImage = styled(ResizedImage)`
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const TitleText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NameText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HitsInfo = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 54px;
  color: ${colors.gray400};
`;

const HitsIcon = styled(IconEye)`
  flex-shrink: 0;
  width: 16px;
  height: 16px;
`;

const Tag = styled.span`
  display: inline-flex;
  transform: translateY(-1.5px);
  margin-right: 6px;
  border-radius: 4px;
  background-color: ${colors.orangeAlpha200};
  padding: 3px 6px;
  width: fit-content;
  height: 20px;
  white-space: nowrap;
  color: ${colors.secondary};
  ${fonts.LABEL_11_SB}
`;
