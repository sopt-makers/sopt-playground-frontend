import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
const defalutThumbnailImgUrl = '/icons/img/defalut_sopticle_thumbnail.png';

interface FeedUrlCardProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  sopticleUrl: string;
  isDetailFeedCard?: boolean;
}

const FeedUrlCard = ({ title, description, thumbnailUrl, sopticleUrl, isDetailFeedCard = false }: FeedUrlCardProps) => {
  const thumbnail = thumbnailUrl || defalutThumbnailImgUrl;
  return (
    <FeedUrlCardBox isDetailFeedCard={isDetailFeedCard}>
      <ThumbnailImg src={thumbnail} loading='lazy' decoding='async' alt='' isDetailFeedCard={isDetailFeedCard} />
      <PreviewTextBox isDetailFeedCard={isDetailFeedCard}>
        <EllipsisText typography='SUIT_16_SB' lineHeight={24}>
          {title}
        </EllipsisText>
        <EllipsisText typography='SUIT_14_L' lineHeight={22}>
          {description}
        </EllipsisText>
        <LinkStyle href={sopticleUrl} target='_blank' isDetailFeedCard={isDetailFeedCard}>
          {sopticleUrl}
        </LinkStyle>
      </PreviewTextBox>
    </FeedUrlCardBox>
  );
};

export default FeedUrlCard;

const FeedUrlCardBox = styled.div<{ isDetailFeedCard?: boolean }>`
  display: flex;
  gap: 12px;
  transition: background-color 0.2s ease;
  border-radius: 12px;
  background-color: ${colors.gray800};
  padding: 8px;
  width: calc(100% - 20px);
  height: 136px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${colors.gray700};
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    height: auto;
  }

  ${({ isDetailFeedCard }) =>
    isDetailFeedCard &&
    `
    width: 100%;
    height: auto;
    flex-direction: column;
  `}
`;

const ThumbnailImg = styled.img<{ isDetailFeedCard?: boolean }>`
  border-radius: 8px;
  max-width: 192px;
  height: 120px;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }

  ${({ isDetailFeedCard }) =>
    isDetailFeedCard &&
    `
    max-width: 100%;
    height: 240px;
    
    @media ${MOBILE_MEDIA_QUERY} {
      height: 172px;
    }
  `}
`;

const PreviewTextBox = styled.div<{ isDetailFeedCard?: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  justify-content: space-between;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 8px;
  }

  ${({ isDetailFeedCard }) => isDetailFeedCard && `width: 100%;`}
`;

const EllipsisText = styled(Text)`
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const LinkStyle = styled.a<{ isDetailFeedCard?: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray300};
  ${fonts.BODY_14_L};

  ${({ isDetailFeedCard }) =>
    isDetailFeedCard &&
    `
    color: ${colors.success};
    text-decoration: underline;

     &:hover {
    text-decoration: underline;
  }
  `}
`;
