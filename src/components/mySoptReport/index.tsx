import ReportText from '@/components/mySoptReport/common/ReportTitle/ReportText';
import MyPG from '@/components/mySoptReport/MyPG';
import Playground from '@/components/mySoptReport/Playground';
import ReportNav from '@/components/mySoptReport/ReportNav';
import Sopt from '@/components/mySoptReport/Sopt';
import { ActiveTabType, ReportDataType } from '@/components/mySoptReport/types';
import MySoptReportImg from '@/public/logos/my-sopt-report.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { Button } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';

export default function MySoptReport() {
  // TODO: 데이터패칭
  const reportData: ReportDataType = {
    // 솝트
    TotalServiceCount: 26,
    ServiceCategoryRankTable: [
      {
        category: '라이프스타일',
        count: 22,
      },
      {
        category: '소셜',
        count: 14,
      },
      {
        category: '생산성',
        count: 10,
      },
      {
        category: '게임/엔터테인먼트',
        count: 10,
      },
    ],
    PopularMeetingSpotRankTable: [
      { spot: '건대입구', count: 16, ratio: 76 },
      { spot: '공덕', count: 7, ratio: 40 },
      { spot: '역삼', count: 3, ratio: 40 },
    ],
    NewSignUpUserCount: 123,
    NewSignUpPartUserCountTable: [
      { part: '기획', count: 24 },
      { part: '안드로이드', count: 16 },
    ],
    // 플그
    TotalVisitCount: 3928,
    PopularVisitDays: '목요일',
    UserMbtiRankTable: [
      { type: 'ENFP', count: 100 },
      { type: 'INFJ', count: 20 },
      { type: 'INFA', count: 10 },
    ],
    WordChainGameInfoTable: {
      wordList: [
        '공자',
        '자벌레',
        '레미콘',
        '공자',
        '자벌레',
        '레미콘',
        '공자',
        '자벌레',
        '레미콘',
        '공자',
        '자벌레',
        '레미콘',
        '공자',
        '자벌레',
        '레미콘',
        '공자',
        '자벌레',
        '레미콘',
      ],
      playCount: 1009,
    },
    ComminityReactionInfoTable: { likeCount: 254, commentCount: 102 },
    CrewPopularGroupInfoTable: {
      id: 183,
      imageUrl:
        'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2024/03/28/77f3b2ff-7929-470d-9e1d-7f9434c31a33.jpeg',
      groupName: '모각작 스터디',
      feedCount: 21,
    },
    CrewTotalGroupUserCount: 472,
    CoffeeChatHistoryInfoTable: {
      titleList: [
        'CRM 도구와 친해져보아요, Braze 잘 쓰는 PM 되기',
        '백엔드 직무가 궁금하거나 외국계 기업이 궁금하다면?',
        '비전공자 PM 취업 준비 (자기소개서, 포트폴리오, 면접, 멘탈 관리)',
        '락토프리라떼 한잔~ 디자인 파트 출신 makers PM이 궁금하신가요?',
      ],
      sendCount: 12,
      openCount: 14,
    },
    CoffeeChatTotalVisitCount: 139,
  };

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
      <MySoptReportBanner>
        <MySoptReportImg />
        <Button rounded='lg' onClick={() => handleSetActive('sopt')}>
          마이 솝트 리포트 보러가기
        </Button>
        <ReportText type='label'>*데이터 집계 기준 : 2024.01.01 ~ 2024.12.31</ReportText>
      </MySoptReportBanner>
      <ReportNav activeTab={activeTab} handleSetActive={handleSetActive} />
      <ReportWrapper>
        <Sopt reportData={reportData} />
        <Playground reportData={reportData} />
        <MyPG />
      </ReportWrapper>
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
