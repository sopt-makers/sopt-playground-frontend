import { MakersGeneration } from '@/components/makers/data/types';

export const generation1: MakersGeneration = {
  title: '1기',
  teams: [
    {
      title: 'makers lead',
      people: [{ type: 'member', id: 1, name: '이정연' }],
    },
    {
      title: 'makers organizer',
      description:
        'makers의 지속 가능한 활동 운영을 포함해서 makers의 문화를 만들어가며, 메이커들이 오너십을 가지고 제품을 더 잘 만들어갈 수 있도록 고민하는 역할을 해요.',
      people: [
        { type: 'raw', name: '이채연', position: '오거나이저 리드' },
        { type: 'raw', name: '이정연', position: '디자이너' },
        { type: 'raw', name: '남주영', position: '웹 프론트엔드' },
      ],
    },
    {
      title: 'SOPT 공식 홈페이지 팀',
      description: 'SOPT의 첫인상인 sopt.org를 만들어요.',
      link: 'https://sopt.org',
      people: [
        { type: 'raw', name: '이채연', position: '오거나이저 리드' },
        { type: 'raw', name: '이정연', position: '디자이너' },
        { type: 'raw', name: '남주영', position: '웹 프론트엔드' },
      ],
    },
  ],
};
