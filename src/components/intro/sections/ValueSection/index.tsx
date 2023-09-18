import styled from '@emotion/styled';
import { FC } from 'react';

import ValueCard from '@/components/intro/sections/ValueSection/ValueCard';
import ValueDescription from '@/components/intro/sections/ValueSection/ValueDescription';

interface ValueSectionProps {}

const ValueSection: FC<ValueSectionProps> = ({}) => {
  return (
    <Container>
      <ValueDescription subTitle='Value 1.' description={'역대 SOPT 구성원의\n멤버 프로필을 둘러볼 수 있어요'} />
      <ValueCard
        content={<div style={{ height: '300px' }}>기수, 파트, MBTI 등 다양한 필터로 구성원을 확인할 수 있어요</div>}
        shineColor='#709dc4'
      />
    </Container>
  );
};

export default ValueSection;

const Container = styled.div`
  padding: 0 80px;
`;
