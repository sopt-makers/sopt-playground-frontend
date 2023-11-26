import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import dayjs from 'dayjs';
import { FC } from 'react';

import { Career } from '@/components/members/detail/types';
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
  color: ${colors.gray300};

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
  background-color: ${colors.gray600};
  width: 1px;
  height: 14px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const CompanyName = styled.div`
  margin-bottom: 10px;
  line-height: 18px;
  color: ${colors.gray10};

  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 16px;

    ${textStyles.SUIT_16_M};
  }
`;

export default CareerItem;
