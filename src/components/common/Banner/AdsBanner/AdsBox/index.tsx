import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

interface AdsBoxProps {
  image: string;
  url: string;
}

export default function AdsBox({ image, url }: AdsBoxProps) {
  return (
    <AdsContainer href={url} target='_blank' rel='noopener noreferrer'>
      <AdsWrapper>
        <AdsImage src={image} alt='광고' />
      </AdsWrapper>
    </AdsContainer>
  );
}

const AdsImage = styled.img`
  width: 100%;
`;

const AdsWrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 912px;
  height: 164px;
  overflow: hidden;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 168px;
  }
`;

const AdsContainer = styled.a`
  display: flex;
  justify-content: center;
`;
