import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import Text from '@/components/common/Text';
const defalutThumbnailImgUrl = '/icons/img/og_playground.jpeg';

interface FeedUrlCardProps {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  url?: string;
}

const FeedUrlCard = ({
  title = '초기의, 고도화된 두 디자인 시스템을 겪으며 느낀점초기에 고도화된 두 디자인 시스템을 겪으며 느낀점초기에 고도화된 두 디자인 시스템을 겪으며 느낀점',
  description = '초기에 고도화된 두 디자인 시스템을 겪으며 느낀점초기에 고도화된 두 디자인 시스템을 겪으며 느낀점초기에 고도화된 두 디자인 시스템을 겪으며 느낀점',
  thumbnailUrl = '/icons/img/og_playground.jpeg',
  url = 'https://www.naver.com/asdfasfasfhasjfhakjshdkf',
}: FeedUrlCardProps) => {
  return (
    <FeedUrlCardBox>
      <ThumbnailImg src={thumbnailUrl} loading='lazy' decoding='async' alt='' />
      <PreviewTextBox>
        <EllipsisText typography='SUIT_16_SB' lineHeight={24}>
          {title}
        </EllipsisText>
        <EllipsisText typography='SUIT_14_L' lineHeight={22}>
          {description}
        </EllipsisText>
        <LinkStyle href={url} target='_blank'>
          {url}
        </LinkStyle>
      </PreviewTextBox>
    </FeedUrlCardBox>
  );
};

export default FeedUrlCard;

const FeedUrlCardBox = styled.div`
  display: flex;
  gap: 12px;
  transition: background-color 0.2s ease;
  border-radius: 12px;
  background-color: ${colors.gray800};
  padding: 8px;
  width: calc(100% - 20px);
  height: 136px;

  &:hover {
    background-color: ${colors.gray700};
  }
`;

const ThumbnailImg = styled.img`
  border-radius: 8px;
  width: 192px;
  height: 120px;
  object-fit: cover;
`;

const PreviewTextBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
`;

const EllipsisText = styled(Text)`
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  /* word-break: break-word; */
`;

const LinkStyle = styled.a`
  overflow: hidden;
  text-decoration: underline;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.success};
  ${fonts.BODY_14_L};

  &:hover {
    text-decoration: underline;
  }
`;
