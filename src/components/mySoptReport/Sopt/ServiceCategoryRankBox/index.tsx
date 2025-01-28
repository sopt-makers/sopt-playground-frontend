import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { ServiceCategoryRankType } from '@/components/mySoptReport/types';

export default function ServiceCategoryRankBox({
  ServiceCategoryRankTable,
}: {
  ServiceCategoryRankTable: ServiceCategoryRankType[];
}) {
  interface ServiceCategoryWithRank extends ServiceCategoryRankType {
    rank: number;
  }

  const sortedData = [...ServiceCategoryRankTable].sort((a, b) => b.count - a.count);

  const rankedData: ServiceCategoryWithRank[] = [];

  sortedData.map((item, index) => {
    const currentRank = index + 1;
    const previousItem: ServiceCategoryWithRank = rankedData[index - 1];

    // MEMO: 이전 항목과 count가 같으면 같은 rank 부여
    if (previousItem && previousItem.count === item.count) {
      rankedData.push({ ...item, rank: previousItem.rank });
    } else {
      rankedData.push({ ...item, rank: currentRank });
    }
  });

  return (
    <ServiceCategoryRankSection>
      {rankedData.map(({ category, count, rank }) => {
        return (
          <ServiceCategoryRank key={category} rank={rank}>
            <RankLeft>
              <p>{rank}위</p>
              <p>{category}</p>
            </RankLeft>
            <>{count}</>
          </ServiceCategoryRank>
        );
      })}
    </ServiceCategoryRankSection>
  );
}

const RankLeft = styled.div`
  display: flex;
  gap: 12px;
`;

const ServiceCategoryRankSection = styled.div`
  margin: 20px 0;
`;

const ServiceCategoryRank = styled.div<{ rank: number }>`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.gray700};
  padding: 6px 0;
  color: ${colors.gray10};

  ${(props) =>
    props.rank === 1
      ? css`
          line-height: 38px; /* 190% */
          letter-spacing: -0.3px;
          font-family: SUIT, sans-serif;
          font-size: 20px;
          font-weight: 500;
          font-style: normal;
        `
      : props.rank === 2
      ? css`
          ${fonts.BODY_18_M};
        `
      : css`
          ${fonts.BODY_16_M};
        `}
`;
