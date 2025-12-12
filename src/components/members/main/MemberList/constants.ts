export const mockRecommendationsResponse = {
  hasWorkPreference: true,
  recommendations: [
    {
      id: 1,
      name: '홍길동',
      profileImage:
        'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/21aec8f0-6f01-42c6-beaa-fe719ce42f91-이재훈자소서사진세로짧은버전.png', // transform → '' 로 들어가지만 서버 응답은 null로
      university: '고려대학교',
      workPreference: {
        ideationStyle: '즉흥',
        workTime: '아침',
        communicationStyle: '몰아서',
        workPlace: '카공',
        feedbackStyle: '직설적',
      },
      activities: [
        {
          generation: 37,
          id: 2,
          part: '웹',
          team: null,
        },
      ], // optional + default([]) → 빈 배열로 처리
    },
    {
      id: 1,
      name: '홍길동',
      profileImage:
        'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/793b8afb-b3a8-4842-b57e-9ae7e0b9bce0-IMG_4435.jpeg',
      university: '고려대학교',
      workPreference: {
        ideationStyle: '즉흥',
        workTime: '아침',
        communicationStyle: '몰아서',
        workPlace: '카공',
        feedbackStyle: '직설적',
      },
      activities: [
        {
          generation: 34,
          id: 1,
          part: '기획',
          team: null,
        },
      ], // optional + default([]) → 빈 배열로 처리
    },
    {
      id: 1,
      name: '홍길동',
      profileImage:
        'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/c0290be0-d0fb-4bc7-bd35-c388d698aed0-SNOW_20240201_153835_883.jpg', // transform → '' 로 들어가지만 서버 응답은 null로
      university: '고려대학교',
      workPreference: {
        ideationStyle: '즉흥',
        workTime: '아침',
        communicationStyle: '몰아서',
        workPlace: '카공',
        feedbackStyle: '직설적',
      },
      activities: [
        {
          generation: 37,
          id: 3,
          part: '안드로이드',
          team: null,
        },
        {
          generation: 36,
          id: 4,
          part: 'iOS',
          team: null,
        },
      ],
    },
    {
      id: 1,
      name: '홍길동',
      profileImage: '',
      university: '고려대학교',
      workPreference: {
        ideationStyle: '즉흥',
        workTime: '아침',
        communicationStyle: '몰아서',
        workPlace: '카공',
        feedbackStyle: '직설적',
      },
      activities: [
        {
          generation: 35,
          id: 5,
          part: '서버',
          team: null,
        },
      ],
    },
  ],
};
