import ReportTitle from '@/components/mySoptReport/common/ReportTitle';
import { CommunityStats, CrewStats, ProfileStats, WordChainGameStats } from '@/components/mySoptReport/constants';
import MyReport from '@/components/mySoptReport/MyReport';
import styled from '@emotion/styled';

export interface MyPgData {
  myType: string;
  totalVisitCount: number;
  myCommunityStats: CommunityStats;
  myProfileStats: ProfileStats;
  myCrewStats: CrewStats;
  myWordChainGameStats: WordChainGameStats;
}

export interface MyPGProps {
  myPgData: MyPgData;
}

export default function MyPG({ myPgData }: MyPGProps) {
  return (
    <MyPGContainer id='my-pg'>
      <ReportTitle
        color={'#FFCA00'}
        subTitle='마이 플그 데이터'
        title={
          <TitleWrapper>
            <div>모아보는</div>
            <div>나의 플그 발자국</div>
          </TitleWrapper>
        }
      />
      <MyReport myPgData={myPgData} />
    </MyPGContainer>
  );
}

const MyPGContainer = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
