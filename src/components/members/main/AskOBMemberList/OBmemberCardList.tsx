import { ReactNode } from 'react';

import OBMemberCard from './OBMemberCard';

export default function OBmemberCardList(): ReactNode[] {
  const memberList = [
    {
      id: 3536,
      name: '홍길동',
      profileImage: 'https://example.com/profile.jpg',
      introduction: '안녕하세요, 서버 개발자입니다.',
      latestActivity: {
        generation: 35,
        part: '서버',
        team: '운영팀',
      },
      currentCareer: {
        companyName: '토스',
        title: '백엔드 개발자',
      },
      previousCareer: {
        companyName: '카카오',
        title: '백엔드 개발자',
      },
      isAnswerGuaranteed: true,
    },
    {
      id: 3555,
      name: '김철수',
      profileImage: 'https://example.com/profile2.jpg',
      introduction: 'iOS 개발을 좋아합니다.',
      latestActivity: {
        generation: 35,
        part: 'iOS',
        team: null,
      },
      currentCareer: {
        companyName: '네이버',
        title: 'iOS 개발자',
      },
      previousCareer: undefined,
      isAnswerGuaranteed: true,
    },
    {
      id: 3555,
      name: '김철수',
      profileImage: 'https://example.com/profile2.jpg',
      introduction: 'iOS 개발을 좋아합니다.',
      latestActivity: {
        generation: 35,
        part: 'iOS',
        team: null,
      },
      currentCareer: {
        companyName: '네이버',
        title: 'iOS 개발자',
      },
      previousCareer: undefined,
      isAnswerGuaranteed: true,
    },
    {
      id: 3601,
      name: '이영희',
      profileImage: '',
      introduction: '프론트엔드에서 사용자 경험을 개선하는 일을 합니다.',
      latestActivity: {
        generation: 36,
        part: '프론트엔드',
        team: '웹팀',
      },
      currentCareer: {
        companyName: '쿠팡',
        title: '프론트엔드 개발자',
      },
      previousCareer: {
        companyName: '라인',
        title: '웹 개발자',
      },
      isAnswerGuaranteed: false,
    },
    {
      id: 3555,
      name: '김철수',
      profileImage: 'https://example.com/profile2.jpg',
      introduction: 'iOS 개발을 좋아합니다.',
      latestActivity: {
        generation: 35,
        part: 'iOS',
        team: null,
      },
      currentCareer: {
        companyName: '네이버',
        title: 'iOS 개발자',
      },
      previousCareer: undefined,
      isAnswerGuaranteed: true,
    },
    {
      id: 3624,
      name: '박민수',
      profileImage: 'https://example.com/profile4.jpg',
      introduction: '데이터 기반 의사결정에 관심이 많습니다.',
      latestActivity: {
        generation: 34,
        part: '데이터',
        team: '분석팀',
      },
      currentCareer: {
        companyName: '배달의민족',
        title: '데이터 엔지니어',
      },
      previousCareer: {
        companyName: 'SK',
        title: '데이터 분석가',
      },
      isAnswerGuaranteed: true,
    },
    {
      id: 3688,
      name: '정수진',
      profileImage: 'https://example.com/profile5.jpg',
      introduction: '안드로이드 앱 성능 최적화에 관심이 있습니다.',
      latestActivity: {
        generation: 36,
        part: '안드로이드',
        team: null,
      },
      currentCareer: {
        companyName: '당근마켓',
        title: '안드로이드 개발자',
      },
      previousCareer: undefined,
      isAnswerGuaranteed: false,
    },
  ];

  return memberList.map((member) => (
    <OBMemberCard
      key={member.id}
      profileImageUrl={member.profileImage}
      name={member.name}
      latestActivity={member.latestActivity}
      currentCareer={member.currentCareer}
      previousCareer={member.previousCareer}
      isAnswerGuaranteed={member.isAnswerGuaranteed}
    />
  ));
}
