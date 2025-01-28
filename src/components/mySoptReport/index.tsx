import Playground from '@/components/mySoptReport/Playground';
import Sopt from '@/components/mySoptReport/Sopt';
import { ReportDataType } from '@/components/mySoptReport/types';

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
      { spot: '공덕', count: 7, ratio: 24 },
      { spot: '역삼', count: 3, ratio: 24 },
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

  return (
    <>
      <Sopt reportData={reportData} />
      <Playground reportData={reportData} />
    </>
  );
}
