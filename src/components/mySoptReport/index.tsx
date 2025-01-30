import MySoptReportBackground from '@/public/logos/my-sopt-report-background.svg';
import MySoptReportImg from '@/public/logos/my-sopt-report.svg';
import styled from '@emotion/styled';
import { Button } from '@sopt-makers/ui';

export default function MySoptReport() {
  return (
    <>
      <MySoptReportBanner>
        <div>
          <MySoptReportImg />
          <Button>마이 솝트 리포트 보러가기</Button>
          <p>*데이터 집계 기준 : 2024.01.01 ~ 2024.12.31</p>
        </div>
        <MySoptReportBackground />
      </MySoptReportBanner>
    </>
  );
}

const MySoptReportBanner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  & > div {
    position: absolute;
  }
`;

const MySoptReportBackgroundImg = styled(MySoptReportBackground)`
  height: 600px;
`;
