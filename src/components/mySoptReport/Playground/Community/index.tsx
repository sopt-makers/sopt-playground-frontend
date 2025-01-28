import Responsive from '@/components/common/Responsive';
import LabelButton from '@/components/mySoptReport/common/LabelButton';
import ReportCard from '@/components/mySoptReport/common/ReportCard';
import ReportText from '@/components/mySoptReport/common/ReportTitle/ReportText';
import { ReportDataType } from '@/components/mySoptReport/types';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import router from 'next/router';
import { playgroundLink } from 'playground-common/export';

export default function Community({ reportData }: { reportData: ReportDataType }) {
  return (
    <>
      <LabelButton>Community</LabelButton>

      {/* 끝말잇기 */}
      <ReportCard>
        <CardWrapper>
          <div>
            <ReportText>끝말잇기에서</ReportText>
            <TextWrapper>
              <ReportText color='#FDBBF9'>{reportData.WordChainGameInfoTable.playCount.toLocaleString()}</ReportText>
              <ReportText>개의 단어가 오갔어요</ReportText>
            </TextWrapper>
          </div>
          <ChipWrapper>
            {reportData.WordChainGameInfoTable.wordList.map((word, i) => {
              return <Chip key={i}>{word}</Chip>;
            })}
          </ChipWrapper>
          <Responsive only='desktop'>
            <LabelWrapper
              onClick={() => {
                window.open(playgroundLink.wordchain(), '_blank');
              }}
            >
              ➡️ 지금 진행 중인 끝말잇기, 참여하러 가기
            </LabelWrapper>
          </Responsive>
          <Responsive only='mobile'>
            <LabelWrapper
              onClick={() => {
                router.push(playgroundLink.wordchain());
              }}
            >
              ➡️ 지금 진행 중인 끝말잇기, 참여하러 가기
            </LabelWrapper>
          </Responsive>
        </CardWrapper>
      </ReportCard>
      {/* 좋아요, 댓글 */}
      <ReportCard>
        <CardWrapper>
          <div>
            <TextWrapper>
              <ReportText color='#FDBBF9'>{reportData.ComminityReactionInfoTable.likeCount}개</ReportText>
              <ReportText>의 좋아요,</ReportText>
            </TextWrapper>
            <TextWrapper>
              <ReportText color='#FDBBF9'>{reportData.ComminityReactionInfoTable.commentCount}개</ReportText>
              <ReportText>의 댓글로 연결되었어요</ReportText>
            </TextWrapper>
          </div>
        </CardWrapper>
      </ReportCard>
    </>
  );
}

const LabelWrapper = styled.div`
  margin-top: 12px;
  text-decoration: underline;
  color: ${colors.gray100};
  ${fonts.BODY_13_R};
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5px;
  justify-content: center;
`;

const Chip = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
  border: 0.7px solid ${colors.gray700};
  border-radius: 600px;
  background-color: transparent;
  padding: 7px 13px;
  height: 28px;
  line-height: 14.612px; /* 137.5% */
  letter-spacing: -0.213px;
  color: ${colors.gray300};
  font-family: SUIT, sans-serif;
  font-size: 10.627px;
  font-weight: 600;
  font-style: normal;
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
