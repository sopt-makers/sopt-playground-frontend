import styled from '@emotion/styled';

import ReportCard from '@/components/mySoptReport/common/ReportCard';
import ReportTitle from '@/components/mySoptReport/common/ReportTitle';
import ReportText from '@/components/mySoptReport/common/ReportTitle/ReportText';
import CoffeeSopt from '@/components/mySoptReport/Playground/CoffeeSopt';
import Community from '@/components/mySoptReport/Playground/Community';
import MBTI from '@/components/mySoptReport/Playground/MBTI';
import MeetingStudy from '@/components/mySoptReport/Playground/MeetingStudy';
import { PlaygroundReportDataType } from '@/components/mySoptReport/types';
import CalendarIcon from '@/public/logos/img_calendar.svg';
import ConfettiIcon from '@/public/logos/img_confetti.svg';

export default function Playground({ reportData }: { reportData: PlaygroundReportDataType }) {
  return (
    <PlaygroundContainer id='playground'>
      <ReportTitle color={'#FDBBF9'} subTitle='SOPT만의 놀이터' title='2024년 플그에서는' />
      <PlaygroundSection>
        {/* 방문자 */}
        <ReportCard>
          <CardWrapper>
            <CoffettiIconWrapper>
              <ReportText>플레이그라운드에 </ReportText>
              <ConfettiIcon />
            </CoffettiIconWrapper>
            <TextWrapper>
              <ReportText color='#FDBBF9' type='big'>
                {reportData.TotalVisitCount.toLocaleString()}번
              </ReportText>
              <ReportText>&nbsp; 모였어요!</ReportText>
            </TextWrapper>
            <div>
              <ReportText type='description'>가장 북적였던 날은</ReportText>
              <TextWrapper>
                <ReportText color='#FDBBF9' type='description'>
                  3월 31일 일요일
                </ReportText>
                <ReportText color='#9D9DA4' type='description'>
                  (2,053명)
                </ReportText>
              </TextWrapper>
            </div>
          </CardWrapper>
        </ReportCard>
        {/* 요일 */}
        <ReportCard>
          <CardWrapper>
            <div>
              <ReportText>우리가 가장 </ReportText>
              <ReportText>많이 모였던 요일은 </ReportText>
            </div>
            <IconContentWrapper>
              <TextWrapper>
                <ReportText color='#FDBBF9' type='big'>
                  {reportData.PopularVisitDays}
                </ReportText>
              </TextWrapper>
              <CalendarIcon />
            </IconContentWrapper>
          </CardWrapper>
        </ReportCard>
        {/* mbti */}
        <ReportCard>
          <CardWrapper>
            <div>
              <ReportText>플레이그라운드 회원 중</ReportText>
              <TextWrapper>
                <ReportText color='#FDBBF9'>{reportData.UserMbtiRankTable[0].type}</ReportText>
                <ReportText>가 &nbsp;</ReportText>
                <ReportText color='#FDBBF9'>{reportData.UserMbtiRankTable[0].count}명</ReportText>
                <ReportText>으로 가장 많아요</ReportText>
              </TextWrapper>
            </div>
            <MBTI UserMbtiRankTable={reportData.UserMbtiRankTable} />
          </CardWrapper>
        </ReportCard>
        <Community reportData={reportData} />
        <MeetingStudy reportData={reportData} />
        <CoffeeSopt reportData={reportData} />
      </PlaygroundSection>
    </PlaygroundContainer>
  );
}

const CoffettiIconWrapper = styled.div`
  display: flex;
  gap: 28px;
  align-items: flex-start;
`;

const IconContentWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
  }
`;

const PlaygroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 48px;
`;

const PlaygroundSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 48px;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
