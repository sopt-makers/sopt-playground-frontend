import styled from '@emotion/styled';

import MyDataCard from '@/components/mySoptReport/ReportCard/MyDataCard';
import MyTypeCard from '@/components/mySoptReport/ReportCard/MyTypeCard';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ReportCardProps {
  type: string;
  value: any;
}

const index = ({ type, value }: ReportCardProps) => {
  return (
    <Wrapper>{type === 'myType' ? <MyTypeCard myType={value} /> : <MyDataCard type={type} value={value} />}</Wrapper>
  );
};

export default index;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 294px;
  height: 403.2px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 245px;
    height: 336px;
  }
`;
