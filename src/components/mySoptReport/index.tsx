import { useGetPGData } from '@/api/endpoint/mySoptReport/getMyPGData';
import styled from '@emotion/styled';
import { fonts } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';

import { useGetReportData } from '@/api/endpoint/mySoptReport/getReportData';
import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
import ReportText from '@/components/mySoptReport/common/ReportTitle/ReportText';
import MyPG from '@/components/mySoptReport/MyPG';
import Playground from '@/components/mySoptReport/Playground';
import ReportNav from '@/components/mySoptReport/ReportNav';
import Sopt from '@/components/mySoptReport/Sopt';
import { ActiveTabType } from '@/components/mySoptReport/types';
import useMediaQuery from '@/hooks/useMediaQuery';
import MySoptReportImg from '@/public/logos/my-sopt-report.svg';
import MySoptReportImgPC from '@/public/logos/mysoptreport-pc.svg';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY, TABLET_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function MySoptReport() {
  const { soptReportData, playgroundReportData, isPending } = useGetReportData();
  const { myPgData, isMyPGDataPending } = useGetPGData();
  const [activeTab, setActiveTab] = useState<ActiveTabType>('sopt');
  const [scrollY, setScrollY] = useState(0);
  const [flag, setFlag] = useState(false);
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  const handleSetActive = (tab: ActiveTabType) => {
    setActiveTab(tab);
    setFlag(true);
    scrollToElement(tab);

    // MEMO: scrollTo 실행 후 바로 setFlag가 실행되지 않고, 스크롤이 내려간 다음 실행될 수 있도록
    setTimeout(() => {
      setFlag(false);
    }, 1000); // 1000ms (1초) 후에 setFlag(false)
  };

  const scrollToElement = (tab: ActiveTabType) => {
    if (!tab) return;

    const targetElement = document.getElementById(tab);

    if (targetElement) {
      if (tab === 'sopt') {
        window.scrollTo({
          top: isMobile ? 592 : 495,
          behavior: 'smooth',
        });
      } else if (tab === 'playground') {
        window.scrollTo({
          top: isMobile ? 2150 : 2220,
          behavior: 'smooth',
        });
      } else if (tab === 'my-pg') {
        window.scrollTo({
          top: isMobile ? 5450 : 5840,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    // MEMO: 버튼 클릭으로 인한 스크롤 변경일 경우, tab 변경을 막기 위함
    if (flag) return;
    if (isMobile) {
      if (scrollY >= 600 && scrollY < 2150) {
        setActiveTab('sopt');
      } else if (scrollY >= 2150 && scrollY < 5450) {
        setActiveTab('playground');
      } else if (scrollY >= 5450) {
        setActiveTab('my-pg');
      }
    } else {
      if (scrollY >= 500 && scrollY < 2220) {
        setActiveTab('sopt');
      } else if (scrollY >= 2220 && scrollY < 5840) {
        setActiveTab('playground');
      } else if (scrollY >= 5840) {
        setActiveTab('my-pg');
      }
    }
  }, [scrollY, flag, isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ReportContainer>
      <>
        <Banner>
          <Responsive only='desktop'>
            <MySoptReportImgDesktop />
            <TextWrapper>
              <PCButton type='button' onClick={() => handleSetActive('sopt')}>
                마이 솝트 리포트 보러가기
              </PCButton>
              <ReportText type='small'>*데이터 집계 기준 : 2024.01.01 ~ 2024.12.31</ReportText>
            </TextWrapper>
          </Responsive>
          <Responsive only='mobile'>
            <MySoptReportBanner>
              <MySoptReportImg />
              <Button rounded='lg' onClick={() => handleSetActive('sopt')}>
                마이 솝트 리포트 보러가기
              </Button>
              <ReportText type='small'>*데이터 집계 기준 : 2024.01.01 ~ 2024.12.31</ReportText>
            </MySoptReportBanner>
          </Responsive>
        </Banner>
        <ReportNav activeTab={activeTab} handleSetActive={handleSetActive} />
        {isPending && isMyPGDataPending && <Loading />}

        {isPending && <Loading />}

        <ReportWrapper>
          {soptReportData && <Sopt reportData={soptReportData} />}
          {playgroundReportData && <Playground reportData={playgroundReportData} />}
        </ReportWrapper>
        {myPgData && <MyPG myPgData={myPgData} />}
      </>
    </ReportContainer>
  );
}

const MySoptReportImgDesktop = styled(MySoptReportImgPC)`
  margin-top: 70px;
  width: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 460px;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 31%;

  @media screen and (max-width: 1300px) {
    width: 35%;
  }

  @media screen and (max-width: 1200px) {
    width: 37%;
  }

  @media ${TABLET_MEDIA_QUERY} {
    width: 40%;
  }
`;

const PCButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: -40px;
  border-radius: 9999px;
  background: white;
  padding: 16px 26px;
  height: 56px;
  color: black;

  ${fonts.LABEL_18_SB};

  &:hover {
    background-color: #e4e4e5;
  }
`;

const ReportWrapper = styled.div`
  margin: 0 20px;
  max-width: 590px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 335px;
  }
`;

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Banner = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #121a2b, #302631);
  padding: 0 50px;
  width: 100%;
  height: 500px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0;
    height: 600px;
  }
`;

const MySoptReportBanner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  padding-top: 16px;
  max-width: 600px;
`;
