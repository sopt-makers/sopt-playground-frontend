import styled from '@emotion/styled';
import { FC } from 'react';

import ValueCard from '@/components/intro/sections/ValueSection/ValueCard';
import Value1Content from '@/components/intro/sections/ValueSection/valueContents/Value1';
import Value2Content from '@/components/intro/sections/ValueSection/valueContents/Value2';
import Value3Content from '@/components/intro/sections/ValueSection/valueContents/Value3';
import Value4Content from '@/components/intro/sections/ValueSection/valueContents/Value4';
import ValueDescription from '@/components/intro/sections/ValueSection/ValueDescription';

interface ValueSectionProps {}

const ValueSection: FC<ValueSectionProps> = ({}) => {
  return (
    <Container>
      <div>
        <ValueDescription
          color='#5DDBFF'
          subTitle='Value 1.'
          description={'역대 SOPT 구성원의\n멤버 프로필을 둘러볼 수 있어요'}
        />
        <ValueCard content={<Value1Content />} shineColor='#5DDBFF' />
      </div>
      <div>
        <ValueDescription
          color='#FF6E1D'
          subTitle='Value 2.'
          description={'SOPT에서 진행된\n프로젝트들을 둘러볼 수 있어요'}
        />
        <ValueCard content={<Value2Content />} shineColor='#FF6E1D' />
      </div>
      <div>
        <ValueDescription
          color='#FDBBF9'
          subTitle='Value 3.'
          description={'SOPT 활동 종료 후에도\n다양한 모임에 참여할 수 있어요'}
        />
        <ValueCard content={<Value3Content />} shineColor='#FDBBF9' />
      </div>
      <div>
        <ValueDescription
          color='#FFCA00'
          subTitle='Value 4.'
          description={'SOPT OB 구성원과\n멘토링을 진행할 수 있어요'}
        />
        <ValueCard content={<Value4Content />} shineColor='#FFCA00' />
      </div>
    </Container>
  );
};

export default ValueSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin: 0 auto;
  padding: 0 80px;
  max-width: 1600px;
`;
