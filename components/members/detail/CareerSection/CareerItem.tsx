import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC } from 'react';

import { Career } from '@/components/members/detail/types';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

type CareerItemProps = {
  career: Career;
};

const CareerItem: FC<CareerItemProps> = ({ career }) => {
  return (
    <Container>
      <LineBetween>
        <div className='circle' />
        <div className='line' />
      </LineBetween>
      <div>
        <CompanyName>{career.companyName}</CompanyName>
        <SubContent>
          <div className='job-position'>{career.title}</div>
          <Divider />
          <div>{`${dayjs(career.startDate).format('YYYY.MM')}${' - '}${
            career.isCurrent ? 'NOW' : dayjs(career.endDate).format('YYYY.MM')
          }`}</div>
        </SubContent>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 12px;
`;

const LineBetween = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .circle {
    margin-top: 6px;
    border-radius: 50%;
    background-color: ${colors.gray60};
    width: 6px;
    height: 6px;
  }

  & > .line {
    margin-top: 3.5px;
    border-radius: 1px;
    background-color: ${colors.gray60};
    width: 1px;
    height: 52px;
  }
`;

const SubContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  color: ${colors.gray60};

  ${textStyles.SUIT_14_M};
`;

const Divider = styled.div`
  background-color: ${colors.gray100};
  width: 1px;
  height: 14px;
`;

const CompanyName = styled.div`
  margin-bottom: 10px;
  line-height: 100%;
  color: ${colors.white};

  ${textStyles.SUIT_18_M};
`;

export default CareerItem;
