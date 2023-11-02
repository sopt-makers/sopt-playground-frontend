import { CategorySelectType } from '@/components/feed/upload/Category/types';

export const categories: CategorySelectType[] = [
  {
    id: '1',
    name: '전체',
    showAllTag: false,
    content: '',
    tags: [
      {
        id: '30',
        name: '기획',
        articleType: 'NORMAL',
      },
      {
        id: '30',
        name: '디',
        articleType: 'NORMAL',
      },
    ],
  },
  {
    id: '2',
    name: '파트',
    showAllTag: false,
    content: '기획, 디자인, 서버, 웹, iOS, Android에 대한 이야기를 해요.',
    tags: [
      {
        id: '30',
        name: '기획',
        articleType: 'NORMAL',
      },
      {
        id: '30',
        name: '디자인',
        articleType: 'NORMAL',
      },
      {
        id: '30',
        name: '사버',
        articleType: 'NORMAL',
      },
      {
        id: '30',
        name: '웹',
        articleType: 'NORMAL',
      },
      {
        id: '30',
        name: 'iOS',
        articleType: 'NORMAL',
      },
      {
        id: '30',
        name: 'Android',
        articleType: 'NORMAL',
      },
    ],
  },
  {
    id: '3',
    name: 'SOPT활동',
    showAllTag: true,
    content: '앱잼, 솝커톤, 솝텀을 포함해 다양한 SOPT에 대한 이야기를 해요.',
    tags: [
      {
        id: '55',
        name: '자유',
        articleType: 'NORMAL',
      },
      {
        id: '55',
        name: '앱잼',
        articleType: 'NORMAL',
      },
      {
        id: '55',
        name: '솝커톤',
        articleType: 'NORMAL',
      },
      {
        id: '55',
        name: '솝텀',
        articleType: 'NORMAL',
      },
    ],
  },
  {
    id: '4',
    name: '취업/진로',
    showAllTag: true,
    content: '취업, 진로에 대한 다양한 이야기를 해요.',
    tags: [
      {
        id: '55',
        name: '자유',
        articleType: 'NORMAL',
      },
      {
        id: '55',
        name: '후기',
        articleType: 'NORMAL',
      },
      {
        id: '55',
        name: '꿀팁',
        articleType: 'NORMAL',
      },
    ],
  },
  {
    id: '5',
    name: '홍보',
    showAllTag: true,
    content: '채용, 행사, 스터디, 설문조사 등 모든 홍보는 여기서 이야기 해요.',
    tags: [
      {
        id: '55',
        name: '자유',
        articleType: 'NORMAL',
      },
      {
        id: '55',
        name: '모집',
        articleType: 'NORMAL',
      },
      {
        id: '55',
        name: '채용',
        articleType: 'NORMAL',
      },
      {
        id: '55',
        name: '프로젝트',
        articleType: 'NORMAL',
      },
      {
        id: '55',
        name: '행사',
        articleType: 'NORMAL',
      },
    ],
  },
  {
    id: '5',
    name: '자유',
    showAllTag: true,
    content: '자유롭게 다양한 이야기를 해요.',
    tags: [],
  },
];
