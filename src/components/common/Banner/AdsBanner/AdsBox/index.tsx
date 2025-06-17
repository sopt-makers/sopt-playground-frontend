import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';

interface AdsProps {
  pc_url: string;
  mobile_url: string;
}

interface AdsBoxProps extends AdsProps {
  link: string;
}

export default function AdsBox({ mobile_url, pc_url, link }: AdsBoxProps) {
  return (
    <div>
      {link ? (
        <a href={link} target='_blank' rel='noopener noreferrer'>
          <Ads mobile_url={mobile_url} pc_url={pc_url} />
        </a>
      ) : (
        <Ads mobile_url={mobile_url} pc_url={pc_url} />
      )}
    </div>
  );
}

const Ads = ({ mobile_url: moImage, pc_url: pcImage }: AdsProps) => {
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
