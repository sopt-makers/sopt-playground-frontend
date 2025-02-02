import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { UserMbtiRankType } from '@/components/mySoptReport/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function MBTI({ UserMbtiRankTable }: { UserMbtiRankTable: UserMbtiRankType[] }) {
  return (
    <MBTIRank>
      {UserMbtiRankTable.map(({ type, count }, i) => {
        return (
          <MbtiRank key={type} rank={i + 1}>
            <p>{type}</p>
            <p>{count}명</p>
          </MbtiRank>
        );
      })}
    </MBTIRank>
  );
}

const MBTIRank = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const MbtiRank = styled.div<{ rank: number }>`
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  border-radius: 6px;
  background-color: ${colors.gray700};
  padding: 8px 20px;

  ${fonts.TITLE_20_SB};

  ${(props) =>
    props.rank === 1
      ? css`
          color: ${colors.white};
        `
      : props.rank === 2
      ? css`
          color: ${colors.gray100};
        `
      : css`
          color: ${colors.gray200};
        `}

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.TITLE_18_SB};
  }
`;
