import styled from '@emotion/styled';

import { textStyles } from '@/styles/typography';

import { TERM } from './contants';

export default function MobileStudyBanner() {
  return (
    <Container>
      <Text>{`📝 ${TERM}기 스터디 모집`}</Text>
      <Text>{`>`}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: linear-gradient(164.77deg, #010101 19.93%, #2b26ff 141.3%), #000;
  padding: 14px 16px;
`;

const Text = styled.div`
  line-height: 100%;
  color: #fff;

  ${textStyles.SUIT_20_B}
`;
