import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { ReactNode } from 'react';

import ResizedImage from '@/components/common/ResizedImage';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ContentsCardProps {
  thumbnail: string;
  title: ReactNode;
  top: ReactNode;
  bottom: ReactNode;
}

export default function ContentsCard({ thumbnail, title, top, bottom }: ContentsCardProps) {
  return (
    <Card>
      <Thumbnail src={thumbnail} alt={`${title} 이미지`} height={84} />
      <Contents>
        <Description>{top}</Description>
        <Title>{title}</Title>
        <Description>{bottom}</Description>
      </Contents>
    </Card>
  );
}

const Card = styled.article`
  display: flex;
  gap: 16px;
  align-items: center;
  border-radius: 20px;
  background: ${colors.gray900};
  padding: 16px;
  width: 100%;
  min-width: 0;
  height: 116px;
`;

const Thumbnail = styled(ResizedImage)`
  border-radius: 14px;
  width: 84px;
  height: 84px;
  object-fit: cover;
`;

const Description = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  color: ${colors.gray200};

  ${fonts.LABEL_14_SB};
`;

const Title = styled.h1`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  color: ${colors.white};

  ${fonts.HEADING_18_B};
`;

const Contents = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;
