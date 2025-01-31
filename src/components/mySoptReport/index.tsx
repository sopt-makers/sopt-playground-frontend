import { useGetReportData } from '@/api/endpoint/mySoptReport/getReportData';
import Loading from '@/components/common/Loading';
import ReportText from '@/components/mySoptReport/common/ReportTitle/ReportText';
import MyPG from '@/components/mySoptReport/MyPG';
import Playground from '@/components/mySoptReport/Playground';
import ReportNav from '@/components/mySoptReport/ReportNav';
import Sopt from '@/components/mySoptReport/Sopt';
import { ActiveTabType } from '@/components/mySoptReport/types';
import MySoptReportImg from '@/public/logos/my-sopt-report.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { Button } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';

export default function MySoptReport() {
  const { soptReportData, playgroundReportData, isPending } = useGetReportData();
  const [activeTab, setActiveTab] = useState<ActiveTabType>('sopt');
  const [scrollY, setScrollY] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleSetActive = (tab: ActiveTabType) => {
    setActiveTab(tab);
    setFlag(true);
    if (tab === 'sopt') {
      window.scrollTo({
        top: 600,
        behavior: 'smooth',
      });
    } else if (tab === 'playground') {
      window.scrollTo({
        top: 2100,
        behavior: 'smooth',
      });
    } else if (tab === 'my-pg') {
      window.scrollTo({
        top: 6000,
        behavior: 'smooth',
      });
    }

    // MEMO: scrollTo 실행 후 바로 setFlag가 실행되지 않고, 스크롤이 내려간 다음 실행될 수 있도록
    setTimeout(() => {
      setFlag(false);
    }, 1000); // 1000ms (1초) 후에 setFlag(false)
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    // MEMO: 버튼 클릭으로 인한 스크롤 변경일 경우, tab 변경을 막기 위함
    if (flag) return;

    if (scrollY >= 600 && scrollY < 2100) {
      setActiveTab('sopt');
    } else if (scrollY >= 2100 && scrollY < 6000) {
      setActiveTab('playground');
    } else if (scrollY >= 6000) {
      setActiveTab('my-pg');
    }
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ReportContainer>
      <>
        <MySoptReportBanner>
          <MySoptReportImg />
          <Button rounded='lg' onClick={() => handleSetActive('sopt')}>
            마이 솝트 리포트 보러가기
          </Button>
          <ReportText type='label'>*데이터 집계 기준 : 2024.01.01 ~ 2024.12.31</ReportText>
        </MySoptReportBanner>
        <ReportNav activeTab={activeTab} handleSetActive={handleSetActive} />
        {isPending && <Loading />}

        <ReportWrapper>
          {soptReportData && <Sopt reportData={soptReportData} />}
          {playgroundReportData && <Playground reportData={playgroundReportData} />}
          <MyPG />
        </ReportWrapper>
      </>
    </ReportContainer>
  );
}

const ReportWrapper = styled.div`
  margin: 0 20px;
  max-width: 400px;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }
`;

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MySoptReportBanner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  background: linear-gradient(135deg, #111622, #1d2032, #322834);
  padding-top: 16px;
  width: 100%;
  height: 600px;
`;
