import { MainSelectorType } from '@/components/community/editor/CategorySelector/types';

export const MAIN_OPTIONS: MainSelectorType[] = [
  { title: '파트', content: '기획, 디자인, 서버, 웹, iOS, Android에 대한 이야기를 해요.' },
  { title: 'SOPT 활동', content: '앱잼, 솝커톤, 솝텀을 포함해 다양한 SOPT에 대한 이야기를 해요.' },
  { title: '취업/진로', content: '취업, 진로에 대한 다양한 이야기를 해요.' },
  { title: '홍보', content: '채용, 행사, 스터디, 설문조사 등 모든 홍보는 여기서 이야기 해요.' },
  { title: '자유', content: '자유롭게 다양한 이야기를 해요.' },
];

export const SUB_OPTIONS = [
  { title: '파트', options: ['기획', '디자인', '서버', '웹', 'iOS', 'Android'] },
  { title: 'SOPT 활동', options: ['자유', '앱잼', '솝커톤', '솝텀'] },
  { title: '취업/진로', options: ['자유', '후기', '꿀팁'] },
  { title: '홍보', options: ['자유', '모집', '채용', '프로젝트', '행사'] },
];

export const isMobile = window.innerWidth <= 768;
