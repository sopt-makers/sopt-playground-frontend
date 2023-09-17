import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC } from 'react';

import { Career } from '@/components/members/detail/types';
import { colors } from '@sopt-makers/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
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
  line-height: 14px;
  color: ${colors.gray60};

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    line-height: 12px;

    ${textStyles.SUIT_12_M};
  }
`;

const Divider = styled.div`
  background-color: ${colors.gray100};
  width: 1px;
  height: 14px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const CompanyName = styled.div`
  margin-bottom: 10px;
  line-height: 18px;
  color: ${colors.white100};

  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 16px;

    ${textStyles.SUIT_16_M};
  }
`;

export default CareerItem;
