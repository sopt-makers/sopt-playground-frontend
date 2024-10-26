import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';

interface AdsProps {
  moImage: string;
  pcImage: string;
}

interface AdsBoxProps extends AdsProps {
  url: string;
}

export default function AdsBox({ moImage, pcImage, url }: AdsBoxProps) {
  return (
    <AdsContainer>
      {url ? (
        <a href={url} target='_blank' rel='noopener noreferrer'>
          <Ads moImage={moImage} pcImage={pcImage} />
        </a>
      ) : (
        <Ads moImage={moImage} pcImage={pcImage} />
      )}
    </AdsContainer>
  );
}

const Ads = ({ moImage, pcImage }: AdsProps) => {
  return (
    <AdsWrapper>
      <Responsive only='desktop'>
        <AdsImage src={pcImage} alt='PC 광고' />
      </Responsive>
      <MobileLayout only='mobile'>
        <AdsImage src={moImage} alt='모바일 광고' />
      </MobileLayout>
    </AdsWrapper>
  );
};

const MobileLayout = styled(Responsive)`
  width: 100%;
`;

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

const AdsContainer = styled.div`
  display: flex;
  justify-content: center;
`;
