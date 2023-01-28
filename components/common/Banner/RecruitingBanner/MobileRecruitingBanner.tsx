import styled from '@emotion/styled';

import { TERM } from '@/components/common/Banner/RecruitingBanner/contants';
import { textStyles } from '@/styles/typography';

export default function MobileRecruitingBanner() {
  return (
    <Container>
      <Text>{`🚀 makers ${TERM}기를 모집해요`}</Text>
      <Text>{`>`}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: linear-gradient(164.77deg, #010101 19.93%, #185eff 141.3%), #000;
  padding: 14px 16px;
`;

const Text = styled.div`
  line-height: 100%;
  color: #fff;

  ${textStyles.SUIT_20_B}
`;
