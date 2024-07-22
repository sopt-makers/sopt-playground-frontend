import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { fonts } from '@sopt-makers/fonts';

interface ReviewCardProp {
  id: number;
  content: string;
}

export default function ReviewCard({ id, content }: ReviewCardProp) {
  const cardColor = [
    'rgba(31, 41, 156, 0.6)',

    'rgba(255, 110, 29, 0.6)',
    'rgba(255, 202, 0, 0.6)',
    'rgba(93, 219, 255, 0.6)',
    'rgba(255, 255, 255, 0.3)',
    'rgba(31, 41, 156, 0.6)',
    'rgba(253, 187, 249, 0.6)',
  ];

  return (
    <Card color={cardColor[id % 7]}>
      <CardInner>{content}</CardInner>
    </Card>
  );
}

const Card = styled.article<{ color: string }>`
  display: flex;
  border-radius: 10px;
  background: ${({ color }) => color};
  padding: 16px 20px;
  width: 100%;
  max-width: 335px;
  max-height: 214px;

  ${fonts.BODY_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
    max-height: 138px;
  }
`;

const CardInner = styled.div`
  box-sizing: border-box;
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;

  @media ${MOBILE_MEDIA_QUERY} {
    max-height: 138px;
    -webkit-line-clamp: 4;
  }
`;
