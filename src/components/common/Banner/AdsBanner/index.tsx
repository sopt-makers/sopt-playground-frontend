import { TABLET_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';

export default function AdsBanner() {
  return <AdsBox>index</AdsBox>;
}

const AdsBox = styled.section`
  margin: 0 30px;
  border-radius: 12px;
  width: 912px;
  height: 164px;
  overflow: hidden;

  @media ${TABLET_MEDIA_QUERY} {
    margin: 0;
    border-radius: 0;
    width: 335px;
    height: 168px;
  }
`;
