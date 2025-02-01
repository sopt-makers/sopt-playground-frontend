import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { PopularMeetingSpotRankType } from '@/components/mySoptReport/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function PopularMeetingSpotRank({
  PopularMeetingSpotRankTable,
}: {
  PopularMeetingSpotRankTable: PopularMeetingSpotRankType[];
}) {
  const stationLineMapping: Record<string, { line: number; color: string }> = {
    건대입구: { line: 7, color: '#647200' },
    공덕: { line: 5, color: '#A123F2' },
    역삼: { line: 2, color: '#00BA0F' },
  };

  return (
    <StationWrapper>
      {PopularMeetingSpotRankTable.map(({ spot, count, ratio }) => {
        const { line, color } = stationLineMapping[spot] || {};

        return (
          <Station key={spot} color={color} ratio={ratio}>
            <StationText>
              <Circle color={color}>{line}</Circle>
              <>{spot}</>
            </StationText>
            <Color color={color}>{count}회</Color>
          </Station>
        );
      })}
    </StationWrapper>
  );
}

const StationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
`;

const StationText = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 24px; /* 153.846% */
  letter-spacing: -0.234px;
  color: ${colors.white};
  color: #fff;
  font-family: SUIT, sans-serif;
  font-size: 15.6px;
  font-weight: 500;
  font-style: normal;

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_13_M};
  }
`;

const Station = styled.div<{ color: string; ratio: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 3px solid ${({ color }) => color};
  border-radius: 100px;
  background-color: ${colors.white};
  padding: 8px 14px;
  width: ${({ ratio }) => (ratio * 2.2 > 100 ? 100 : ratio * 2.2)}%;
  color: ${colors.black};

  ${fonts.BODY_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    width: ${({ ratio }) => (ratio * 4 > 100 ? 100 : 40 > ratio * 4 ? 40 : ratio * 4)}%;
    ${fonts.BODY_16_M};
  }
`;

const Color = styled.div<{ color: string }>`
  color: ${({ color }) => color};

  ${fonts.TITLE_14_SB};
`;
