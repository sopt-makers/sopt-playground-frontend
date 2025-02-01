import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconChevronRight } from '@sopt-makers/icons';
import { Button, Tag } from '@sopt-makers/ui';
import router from 'next/router';
import { playgroundLink } from 'playground-common/export';

import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import ReportCard from '@/components/mySoptReport/common/ReportCard';
import ReportTitle from '@/components/mySoptReport/common/ReportTitle';
import ReportText from '@/components/mySoptReport/common/ReportTitle/ReportText';
import PopularMeetingSpotRank from '@/components/mySoptReport/Sopt/PopularMeetingSpotRank';
import ServiceCategoryRankBox from '@/components/mySoptReport/Sopt/ServiceCategoryRankBox';
import { SoptReportDataType } from '@/components/mySoptReport/types';
import NewMemberIcon from '@/public/logos/img_member.svg';
import ServiceIcon from '@/public/logos/img_service.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function Sopt({ reportData }: { reportData: SoptReportDataType }) {
  const totalCount = reportData.NewSignUpPartUserCountTable.reduce((acc, { count }) => acc + count, 0);

  return (
    <SoptContainer id='sopt'>
      <ReportTitle color={'#FF6E1D'} subTitle='차곡차곡 쌓인 솝트의 기록들' title='2024년 SOPT는' />
      <SoptSection>
        {/* 새롭게 탄생한 서비스 */}
        <ReportCard>
          <>
            <Head>
              <ReportText>새롭게 탄생한 서비스는</ReportText>
              <IconContentWrapper>
                <ServiceIcon />
                <div>
                  <ReportText color='#5CDBFE' type='big'>
                    {reportData.TotalServiceCount}개
                  </ReportText>
                  <ReportText type='label'>*솝커톤, 앱잼 합산</ReportText>
                </div>
              </IconContentWrapper>
            </Head>
            <Bottom>
              <ReportText>가장 많은 서비스가 속한</ReportText>
              <ReportText color='#5CDBFE'>인기 카테고리 TOP 5</ReportText>
              <ServiceCategoryRankBox ServiceCategoryRankTable={reportData.ServiceCategoryRankTable} />
              <LoggingClick eventKey='clickMyReportGotoProject'>
                <>
                  <Responsive only='desktop'>
                    <ButtonWrapper
                      onClick={() => {
                        window.open(playgroundLink.projectList(), '_blank');
                      }}
                    >
                      <Button rounded='lg' size='lg' RightIcon={IconChevronRight}>
                        전체 서비스 보러가기
                      </Button>
                    </ButtonWrapper>
                  </Responsive>
                  <Responsive only='mobile'>
                    <ButtonWrapper
                      onClick={() => {
                        router.push(playgroundLink.projectList());
                      }}
                    >
                      <Button rounded='lg' RightIcon={IconChevronRight}>
                        전체 서비스 보러가기
                      </Button>
                    </ButtonWrapper>
                  </Responsive>
                </>
              </LoggingClick>
            </Bottom>
          </>
        </ReportCard>
        {/* 정기모임 인기지역 */}
        <ReportCard>
          <>
            <ReportText>SOPT의 열정이 가장 많이 모인 </ReportText>
            <TextWrapper>
              <ReportText color='#5CDBFE'> 정기모임 인기 지역</ReportText>
              <ReportText>은</ReportText>
            </TextWrapper>
            <PopularMeetingSpotRank PopularMeetingSpotRankTable={reportData.PopularMeetingSpotRankTable} />
          </>
        </ReportCard>
        {/* 새롭게 합류한 팀원 */}
        <ReportCard>
          <>
            <Head>
              <div>
                <ReportText>Playground에</ReportText>
                <ReportText> 새롭게 합류한 회원은</ReportText>
              </div>
              <IconContentWrapper>
                <NewMemberIcon />
                <ReportText color='#5CDBFE' type='big'>
                  {reportData.NewSignUpUserCount}명
                </ReportText>
              </IconContentWrapper>
            </Head>
            <Bottom>
              <TextWrapper>
                <ReportText>내가 최근 활동한 &nbsp;</ReportText>
                <ReportText color='#5CDBFE'>파트</ReportText>
                <ReportText>에는</ReportText>
              </TextWrapper>
              <ContentWrapper>
                <div>
                  <TextWrapper>
                    <ReportBigText color='#5CDBFE'>{totalCount}명</ReportBigText>
                    <ReportBigText>이</ReportBigText>
                  </TextWrapper>
                  <ReportBigText>새로 가입했어요!</ReportBigText>
                </div>
                <TagWrapper>
                  {reportData.NewSignUpPartUserCountTable.map(({ part, count }) => {
                    return (
                      <Tag key={part} size='md'>
                        {part}({count})명
                      </Tag>
                    );
                  })}
                </TagWrapper>
              </ContentWrapper>
            </Bottom>
          </>
        </ReportCard>
      </SoptSection>
    </SoptContainer>
  );
}

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

const SoptContainer = styled.div`
  padding-top: 20px;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 12px;
  margin-bottom: 20px;
`;

const ReportBigText = styled.h1<{ color?: string }>`
  color: ${({ color }) => (color ? color : colors.white)};
  ${fonts.HEADING_24_B};
`;

const SoptSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 44px;
`;

const TextWrapper = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 12px;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px dashed ${colors.gray500};
  padding-bottom: 24px;
`;

const Bottom = styled.div`
  padding-top: 24px;
`;
