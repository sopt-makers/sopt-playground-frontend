import { Meta } from '@storybook/react';

import { ReportDataType } from '@/components/mySoptReport/types';

import Sopt from '.';

export default {
  component: Sopt,
} as Meta<typeof Sopt>;

export const Default = {
  render: function Rendered() {
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
        { spot: '건대입구', ratio: 76 },
        { spot: '공덕', count: 24 },
        { spot: '홍대입구', count: 76 },
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
      ],
      WordChainGameInfoTable: { wordList: ['공자', '자벌레', '레미콘'], playCount: 1009 },
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
        ],
        sendCount: 12,
        openCount: 14,
      },
      CoffeeChatTotalVisitCount: 139,
    };

    return <Sopt reportData={reportData} />;
  },

  args: {},
  name: '기본',
};
