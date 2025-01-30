import Responsive from '@/components/common/Responsive';
import LabelButton from '@/components/mySoptReport/common/LabelButton';
import ReportCard from '@/components/mySoptReport/common/ReportCard';
import ReportText from '@/components/mySoptReport/common/ReportTitle/ReportText';
import Tooltip from '@/components/mySoptReport/common/Tooltip';
import { ReportDataType } from '@/components/mySoptReport/types';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconChevronRight } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import router from 'next/router';
import { playgroundLink } from 'playground-common/export';

export default function MeetingStudy({ reportData }: { reportData: ReportDataType }) {
  return (
    <>
      <LabelButton>Meeting/Study</LabelButton>
      {/* 모임 피드 */}
      <ReportCard>
        <>
          <Head>
            <TextWrapper>
              <ReportText color='#FDBBF9'>모임</ReportText>
              <ReportText>을 통해 연결된 회원은</ReportText>
            </TextWrapper>
            <ReportText color='#FDBBF9' type='big'>
              {reportData.CrewTotalGroupUserCount.toLocaleString()}명
            </ReportText>
          </Head>
          <Bottom>
            <ReportText>모임 피드를</ReportText>
            <ReportText>가장 열심히 기록한 모임은</ReportText>
            <Tooltip>
              <TextWrapper>{reportData.CrewPopularGroupInfoTable.feedCount}개</TextWrapper>
            </Tooltip>
            <ReportBigText color='#FDBBF9'>{reportData.CrewPopularGroupInfoTable.groupName}</ReportBigText>
            <ImgWrapper src={reportData.CrewPopularGroupInfoTable.imageUrl} alt='모임 이미지' />
            <Responsive only='desktop'>
              <ButtonWrapper
                onClick={() => {
                  window.open(playgroundLink.groupList(), '_blank');
                }}
              >
                <Button rounded='lg' RightIcon={IconChevronRight}>
                  모임 피드 보러가기
                </Button>
              </ButtonWrapper>
            </Responsive>
            <Responsive only='mobile'>
              <ButtonWrapper
                onClick={() => {
                  router.push(playgroundLink.groupList());
                }}
              >
                <Button rounded='lg' RightIcon={IconChevronRight}>
                  모임 피드 보러가기
                </Button>
              </ButtonWrapper>
            </Responsive>
          </Bottom>
        </>
      </ReportCard>
    </>
  );
}

const ImgWrapper = styled.img`
  align-self: stretch;
  margin: 12px 0 32px;
  border-radius: 14px;
  height: 176px;
`;

const ReportBigText = styled.h1`
  color: '#FDBBF9';
  ${fonts.HEADING_28_B};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
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

const TextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;
