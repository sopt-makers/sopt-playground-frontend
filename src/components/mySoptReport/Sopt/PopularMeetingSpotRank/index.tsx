import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { PopularMeetingSpotRankType } from '@/components/mySoptReport/types';

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
          <Station key={spot} color={color} ratio={ratio * 2}>
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
  color: ${colors.white};

  ${fonts.BODY_13_M};
`;

const Station = styled.div<{ color: string; ratio: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 3px solid ${({ color }) => color};
  border-radius: 100px;
  background-color: ${colors.white};
  padding: 8px 14px;
  width: ${({ ratio }) => (ratio > 100 ? 100 : 35 > ratio ? 35 : ratio)}%;
  color: ${colors.black};

  ${fonts.BODY_16_M};
`;

const Color = styled.div<{ color: string }>`
  color: ${({ color }) => color};

  ${fonts.TITLE_14_SB};
`;
