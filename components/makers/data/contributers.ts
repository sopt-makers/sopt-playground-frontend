import { MakersGeneration } from '@/components/makers/data/types';

export const contributers: MakersGeneration = {
  title: 'Contributers',
  message: 'makers 이전에 SOPT 프로덕트를 만드는 데 기여한 분들이에요.',
  teams: [
    {
      title: 'SOPT 공식홈페이지 초기 개편',
      people: [
        { type: 'raw', name: '조승우' },
        { type: 'member', id: 179, name: '이영진' },
        { type: 'member', id: 176, name: '이다은' },
        { type: 'member', id: 68, name: '박나희' },
        { type: 'member', id: 177, name: '김희빈' },
        { type: 'member', id: 178, name: '권세훈' },
      ],
    },
    {
      title: 'SOPT Playground 초기 개발',
      description: '현재 플레이그라운드의 프로젝트 초기 기능을 개발했어요.',
      people: [
        { type: 'member', id: 1, name: '이정연' },
        { type: 'member', id: 23, name: '이예서' },
        { type: 'raw', name: '정예린' },
        { type: 'member', id: 13, name: '김은수' },
        { type: 'member', id: 2, name: '박건영' },
        { type: 'member', id: 3, name: '이준호' },
        { type: 'member', id: 41, name: '유희수' },
      ],
    },
  ],
};
