import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

interface ContentsCardProps {
  thumbnail: string;
  title: string;
  top: string;
  bottom: string;
  isCurrent?: boolean;
}

export default function ContentsCard({ thumbnail, title, top, bottom, isCurrent }: ContentsCardProps) {
  return (
    <Card>
      <Thumbnail src={thumbnail} alt={`${title} 이미지`} />
      <Contents>
        <Description>{top}</Description>
        <Title>{title}</Title>
        <Bottom>
          {isCurrent !== undefined && <Circle isCurrent={isCurrent} />}
          <Description>{bottom}</Description>
        </Bottom>
      </Contents>
    </Card>
  );
}

const Card = styled.article`
  display: center;
  gap: 16px;
  align-items: center;
  border-radius: 20px;
  background: ${colors.gray900};
  padding: 16px;
  width: 100%;
  height: 116px;
`;

const Thumbnail = styled.img`
  border-radius: 14px;
  width: 84px;
  height: 84px;
  object-fit: cover;
`;

const Description = styled.p`
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  color: ${colors.gray200};

  ${fonts.LABEL_14_SB};
`;

const Circle = styled.div<{ isCurrent: boolean }>`
  border-radius: 50%;
  background-color: ${({ isCurrent }) => (isCurrent ? '#CDF47C' : colors.gray300)};
  width: 6px;
  height: 6px;
`;

const Title = styled.h1`
  max-width: 227px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  color: ${colors.white};

  ${fonts.HEADING_18_B};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Bottom = styled.footer`
  display: flex;
  gap: 8px;
  align-items: center;
`;
