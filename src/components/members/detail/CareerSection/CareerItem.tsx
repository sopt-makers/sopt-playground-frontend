import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import dayjs from 'dayjs';
import { FC } from 'react';

import { Career } from '@/components/members/detail/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { Flex } from '@toss/emotion-utils';
import { fonts } from '@sopt-makers/fonts';

type CareerItemProps = {
  career: Career;
  isCurrent: boolean;
};

const CareerItem: FC<CareerItemProps> = ({ career, isCurrent }) => {
  return (
    <div>
      <Flex align='center' style={{ gap: 10, marginBottom: 10 }}>
        <CompanyName>{career.companyName}</CompanyName>
        {isCurrent && <NowBadge>NOW</NowBadge>}
      </Flex>
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

export default CareerItem;

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
  line-height: 18px;
  color: ${colors.gray10};

  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 16px;

    ${textStyles.SUIT_16_M};
  }
`;

const NowBadge = styled.div`
  border-radius: 5px;
  background: ${colors.orangeAlpha200};
  padding: 2px 5px;
  line-height: 16px;
  letter-spacing: -0.24px;
  color: ${colors.secondary};

  ${fonts.LABEL_12_SB}
`;
