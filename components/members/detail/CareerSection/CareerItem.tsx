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
  );
};

const SubContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  line-height: 100%;
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
