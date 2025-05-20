import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconEye } from '@sopt-makers/icons';
import { Tag } from '@sopt-makers/ui';

interface PopularCardProps {
  rank: number;
  category: string;
  title: string;
  profileImage: string;
  name: string;
  hits: number;
}

interface FeedInfoProps {
  titleBox?: boolean;
  authorBox?: boolean;
}

const PopularCard = ({ rank, category, title, profileImage, name, hits }: PopularCardProps) => {
  return (
    <PopularCardWrapper>
      <Text typography='SUIT_18_SB' color={colors.white} lineHeight={24} style={{ width: '16px' }}>
        {rank}
      </Text>
      <FeedInfo titleBox>
        <Category>{category}</Category>
        <TitleText typography='SUIT_14_SB' color={colors.white} lineHeight={18}>
          {title}
        </TitleText>
      </FeedInfo>
      <FeedInfo authorBox>
        <img src={profileImage} alt={name} />
        <Text typography='SUIT_14_SB' color={colors.gray50} lineHeight={18}>
          {name}
        </Text>
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

const PopularCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background: ${colors.gray900};
  padding: 16px;
  width: 100%;
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
    width: 128px;
    flex-shrink: 0;
  `}

  img {
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
`;

const Category = styled(Tag)`
  flex-shrink: 0;
  width: fit-content;
`;

const TitleText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HitsInfo = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: fit-content;
  min-width: 42px;
  color: ${colors.gray400};
`;

const HitsIcon = styled(IconEye)`
  flex-shrink: 0;
  width: 16px;
  height: 16px;
`;
