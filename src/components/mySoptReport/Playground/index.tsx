import styled from '@emotion/styled';

import ReportCard from '@/components/mySoptReport/common/ReportCard';
import ReportTitle from '@/components/mySoptReport/common/ReportTitle';
import ReportText from '@/components/mySoptReport/common/ReportTitle/ReportText';
import { ReportDataType } from '@/components/mySoptReport/types';

export default function Playground({ reportData }: { reportData: ReportDataType }) {
  return (
    <>
      <ReportTitle color={'#FDBBF9'} subTitle='SOPT만의 놀이터' title='2024년 플그에서는' />
      <PlaygroundSection id='playground'>
        {/* 방문자 */}
        <ReportCard>
          <CardWrapper>
            <ReportText>플레이그라운드에 </ReportText>
            <TextWrapper>
              <ReportText color='#FDBBF9' type='big'>
                {reportData.TotalVisitCount.toLocaleString()}번
              </ReportText>
              <ReportText>모였어요!</ReportText>
            </TextWrapper>
          </CardWrapper>
        </ReportCard>
        {/* 요일 */}
        <ReportCard>
          <CardWrapper>
            <div>
              <ReportText>우리가 가장 </ReportText>
              <ReportText>많이 모였던 요일은 </ReportText>
            </div>
            <TextWrapper>
              <ReportText color='#FDBBF9' type='big'>
                {reportData.PopularVisitDays}
              </ReportText>
            </TextWrapper>
          </CardWrapper>
        </ReportCard>
      </PlaygroundSection>
    </>
  );
}

const PlaygroundSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 48px;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
