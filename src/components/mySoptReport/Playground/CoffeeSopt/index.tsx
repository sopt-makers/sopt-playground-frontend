import Responsive from '@/components/common/Responsive';
import LabelButton from '@/components/mySoptReport/common/LabelButton';
import ReportCard from '@/components/mySoptReport/common/ReportCard';
import ReportText from '@/components/mySoptReport/common/ReportTitle/ReportText';
import { ReportDataType } from '@/components/mySoptReport/types';
import CoffeSoptIcon from '@/public/logos/img_coffeechat.svg';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconChevronRight } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import router from 'next/router';
import { playgroundLink } from 'playground-common/export';

export default function CoffeeSopt({ reportData }: { reportData: ReportDataType }) {
  return (
    <>
      <LabelButton>CoffeeSOPT</LabelButton>
      {/* 커피솝 */}
      <ReportCard>
        <>
          <Head>
            <TextWrapper>
              <ReportText>회원들이 커피솝에</ReportText>
              <ReportText>방문한 횟수는</ReportText>
            </TextWrapper>
            <IconWrapper>
              <ReportText color='#FDBBF9' type='big'>
                {reportData.CoffeeChatTotalVisitCount.toLocaleString()}번
              </ReportText>
            </IconWrapper>
          </Head>
          <Bottom>
            <TextWrapper>
              <ReportText color='#FDBBF9'>{reportData.CoffeeChatHistoryInfoTable.openCount}분</ReportText>
              <ReportText>이 열어주신 커피챗을 통해</ReportText>
            </TextWrapper>
            <div>
              <TextWrapper>
                <ReportBigText color='#FDBBF9'>총 {reportData.CoffeeChatHistoryInfoTable.sendCount}번</ReportBigText>
                <ReportBigText color='#F0F0F0'>의 커피챗이</ReportBigText>
              </TextWrapper>
              <ReportBigText color='#F0F0F0'>성사되었어요!</ReportBigText>
            </div>
            <IconWrapper>
              <CoffeSoptIcon />
            </IconWrapper>
            <CoffechatList>
              {reportData.CoffeeChatHistoryInfoTable.titleList.map((title, i) => {
                return (
                  <CoffechatBox key={title + i} rank={i + 1}>
                    {title}
                  </CoffechatBox>
                );
              })}
            </CoffechatList>
            <Responsive only='desktop'>
              <ButtonWrapper
                onClick={() => {
                  window.open(playgroundLink.coffeechat(), '_blank');
                }}
              >
                <Button rounded='lg' RightIcon={IconChevronRight}>
                  커피솝 방문하기
                </Button>
              </ButtonWrapper>
            </Responsive>
            <Responsive only='mobile'>
              <ButtonWrapper
                onClick={() => {
                  router.push(playgroundLink.coffeechat());
                }}
              >
                <Button rounded='lg' RightIcon={IconChevronRight}>
                  커피솝 방문하기
                </Button>
              </ButtonWrapper>
            </Responsive>
          </Bottom>
        </>
      </ReportCard>
    </>
  );
}

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
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
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ReportBigText = styled.h1<{ color: string }>`
  color: ${({ color }) => color};
  ${fonts.HEADING_28_B};
`;

const CoffechatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

const CoffechatBox = styled.div<{ rank: number }>`
  display: flex;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  border-radius: 6px;
  background-color: ${colors.gray700};
  padding: 8px 20px;

  ${fonts.TITLE_18_SB};

  ${(props) =>
    props.rank === 1
      ? css`
          color: ${colors.white};
        `
      : props.rank === 2
      ? css`
          color: ${colors.gray100};
        `
      : props.rank === 3
      ? css`
          color: ${colors.gray200};
        `
      : css`
          color: ${colors.gray300};
        `}
`;
