import { CategorySelectType } from '@/components/feed/upload/Category/types';

export const categories: CategorySelectType = [
  {
    id: 1,
    name: '자유',
    content: '자유롭게 다양한 이야기를 해요.',
    hasAll: false,
    children: [],
  },
  {
    id: 2,
    name: '파트',
    content: '기획, 디자인, 서버, 웹, iOS, Android에 대한 이야기를 해요.',
    hasAll: false,
    children: [
      {
        id: 6,
        name: '기획',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 7,
        name: '디자인',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 8,
        name: '서버',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 9,
        name: '웹',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 10,
        name: 'iOS',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 11,
        name: 'Android',
        content: null,
        hasAll: false,
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: 'SOPT 활동',
    content: '앱잼, 솝커톤, 솝텀을 포함해 다양한 SOPT에 대한 이야기를 해요.',
    hasAll: true,
    children: [
      {
        id: 12,
        name: '앱잼',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 13,
        name: '솝커톤',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 14,
        name: '솝텀',
        content: null,
        hasAll: false,
        children: [],
      },
    ],
  },
  {
    id: 4,
    name: '홍보',
    content: '채용, 행사, 스터디, 설문조사 등 모든 홍보는 여기서 이야기 해요.',
    hasAll: true,
    children: [
      {
        id: 15,
        name: '모집',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 16,
        name: '채용',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 17,
        name: '프로젝트',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 18,
        name: '행사',
        content: null,
        hasAll: false,
        children: [],
      },
    ],
  },
  {
    id: 5,
    name: '취업/진로',
    content: '취업, 진로에 대한 다양한 이야기를 해요.',

    hasAll: true,
    children: [
      {
        id: 19,
        name: '후기',
        content: null,
        hasAll: false,
        children: [],
      },
      {
        id: 20,
        name: '꿀팁',
        content: null,
        hasAll: false,
        children: [],
      },
    ],
  },
];
