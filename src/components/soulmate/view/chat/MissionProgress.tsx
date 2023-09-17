import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

type Mission = MissionStatus & {
  name: string;
};

type MissionStatus =
  | {
      status: 'waiting';
      startTimestamp?: Date;
    }
  | { status: 'running'; endTimestamp?: Date }
  | { status: 'completed' };

interface MissionProgressProps {
  className?: string;
  missions: Mission[];
}

const MissionProgress: FC<MissionProgressProps> = ({ className, missions }) => {
  return (
    <Container className={className}>
      {missions.map((mission, idx) => (
        <ProgressCell key={idx} status={mission.status}>
          {mission.status === 'completed' && <ProgressTitle>{mission.name}을 완료했어요</ProgressTitle>}
          {mission.status === 'running' && (
            <>
              <ProgressTitle>{mission.name}을 수행중이에요</ProgressTitle>
              {mission.endTimestamp && <ProgressDescription>미션 종료까지 N시간</ProgressDescription>}
            </>
          )}
          {mission.status === 'waiting' && (
            <>
              <ProgressTitle>{mission.name}이 대기중이에요</ProgressTitle>
              {mission.startTimestamp && <ProgressDescription>N시간 뒤 미션 공개</ProgressDescription>}
            </>
          )}
        </ProgressCell>
      ))}
    </Container>
  );
};

export default MissionProgress;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 사라질 컴포넌트라 보라색 걷어내기 임의로 수정
const ProgressCell = styled.div<{ status: MissionStatus['status'] }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  padding: 20px;

  ${(props) =>
    props.status === 'completed' &&
    css`
      background-color: ${colors.black60};
    `}
  ${(props) =>
    props.status === 'running' &&
    css`
      background-color: ${colors.blue50};
    `}
    ${(props) =>
    props.status === 'waiting' &&
    css`
      background-color: ${colors.black80};
      color: ${colors.gray80};
    `}

    @media ${MOBILE_MEDIA_QUERY} {
    justify-content: center;
  }
`;

const ProgressTitle = styled.div`
  line-height: 100%;
  font-weight: 600;

  ${textStyles.SUIT_16_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_SB};
  }
`;

const ProgressDescription = styled.div`
  line-height: 100%;
  letter-spacing: -0.14px;

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_M};
  }
`;
