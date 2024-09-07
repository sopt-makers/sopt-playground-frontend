import Responsive from '@/components/common/Responsive';
import styled from '@emotion/styled';

interface AdsBoxProps {
  moImage: string;
  pcImage: string;
  url: string;
}

export default function AdsBox({ moImage, pcImage, url }: AdsBoxProps) {
  return (
    <AdsContainer href={url} target='_blank' rel='noopener noreferrer'>
      <AdsWrapper>
        <Responsive only='desktop'>
          <AdsImage src={pcImage} alt='PC 광고' />
        </Responsive>
        <Responsive only='mobile'>
          <AdsImage src={moImage} alt='모바일 광고' />
        </Responsive>
      </AdsWrapper>
    </AdsContainer>
  );
}

const AdsImage = styled.img`
  height: 100%;
`;

const AdsWrapper = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 912px;
  height: 100%;
  overflow: hidden;
`;

const AdsContainer = styled.a`
  display: flex;
  justify-content: center;
`;
