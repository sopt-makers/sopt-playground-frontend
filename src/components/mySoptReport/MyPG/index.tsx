import ReportTitle from '@/components/mySoptReport/common/ReportTitle';
import styled from '@emotion/styled';

export default function MyPG() {
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
      {/* TODO: 마이 플그 카드 */}
    </MyPGContainer>
  );
}

const MyPGContainer = styled.div`
  padding-top: 48px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
