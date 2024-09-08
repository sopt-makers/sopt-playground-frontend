import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';

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
  width: 100%;
  max-width: 912px;
  overflow: hidden;
`;

const AdsContainer = styled.a`
  display: flex;
  justify-content: center;
`;
