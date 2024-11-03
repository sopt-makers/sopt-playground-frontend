import Responsive from '@/components/common/Responsive';
import styled from '@emotion/styled';

interface AdsProps {
  moImage: string;
  pcImage: string;
}

interface AdsBoxProps extends AdsProps {
  url: string;
}

export default function AdsBox({ moImage, pcImage, url }: AdsBoxProps) {
  return (
    <div>
      {url ? (
        <a href={url} target='_blank' rel='noopener noreferrer'>
          <Ads moImage={moImage} pcImage={pcImage} />
        </a>
      ) : (
        <Ads moImage={moImage} pcImage={pcImage} />
      )}
    </div>
  );
}

const Ads = ({ moImage, pcImage }: AdsProps) => {
  return (
    <article>
      <Responsive only='desktop'>
        <AdsImage src={pcImage} alt='PC 광고' />
      </Responsive>
      <Responsive only='mobile'>
        <AdsImage src={moImage} alt='모바일 광고' />
      </Responsive>
    </article>
  );
};

const AdsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: center;
`;
