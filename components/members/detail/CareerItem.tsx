import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC } from 'react';

import { Career } from '@/components/members/upload/types';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

type CareerItemProps = {
  career: Career;
};

const CareerItem: FC<CareerItemProps> = ({ career }) => {
  return (
    <Container>
      <div>
        <div>{career.companyName}</div>
        <Divider />
        <div>{career.title}</div>
        <Divider className='pc-only' />
      </div>
      <div>
        {`${dayjs(career.startDate).format('YYYY.MM')}${' - '}
          ${career.isCurrent ? 'NOW' : dayjs(career.endDate).format('YYYY.MM')}`}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  ${textStyles.SUIT_18_M}

  & > div {
    display: flex;
    align-items: center;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 12px;
    ${textStyles.SUIT_15_M};

    color: ${colors.gray30};

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    & > div:first-of-type {
      display: flex;
      align-items: center;
      border: none;

      & > div:first-of-type {
        ${textStyles.SUIT_16_B};

        color: ${colors.white100};
      }
    }
  }
`;

const Divider = styled.div`
  margin: 0 20px;
  background-color: ${colors.gray100};
  width: 1.5px;
  height: 14px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0 12px;
    height: 12px;
  }
`;

export default CareerItem;
