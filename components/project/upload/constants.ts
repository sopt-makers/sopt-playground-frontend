import { Category, FormItem } from '@/components/project/upload/types';

const LATEST_GENERATION = 30;

export const GENERATION = Array.from({ length: LATEST_GENERATION }, (_, i) => i + 1).reverse();

export const categoryLabel: Record<Category, string> = {
  [Category.APPJAM]: '앱잼',
  [Category.SOPKATHON]: '솝커톤',
  [Category.SOPTERM]: '솝텀 프로젝트',
  [Category.STUDY]: '스터디',
  [Category.JOINTSEMINAR]: '합동 세미나',
  [Category.ETC]: '기타',
};

export const FORM_ITEMS: FormItem[] = [
  {
    label: '프로젝트 이름',
    value: 'name',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '기수',
    value: 'generation',
    isDirty: false,
    isRequired: false,
  },
  {
    label: '어디서 진행했나요?',
    value: 'category',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '프로젝트 팀원',
    value: 'members',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '추가 합류한 팀원',
    value: 'releaseMembers',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '서비스 형태',
    value: 'serviceType',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '프로젝트 기간',
    value: 'period',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '프로젝트 한줄 소개',
    value: 'summary',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '프로젝트 설명',
    value: 'detail',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '로고 이미지',
    value: 'logoImage',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '썸네일 이미지',
    value: 'thumbnailImage',
    isDirty: false,
    isRequired: false,
  },
  {
    label: '프로젝트 이미지',
    value: 'projectImage',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '링크',
    value: 'link',
    isDirty: false,
    isRequired: false,
  },
];

// dirtyFields: defaultValue 를 설정했을때, defaultValue랑 같은지 다른지 여부로 판단
// const _formItems = FORM_ITEMS.map((formItem) => ({
//   ...formItem,
//   isDirty: dirtyFields?.[formItem.value] ? true : formItem.isDirty,
// })).reduce(
//   (acc: FormItem[], cur) => (cur.value === 'members' ? [...acc, { ...cur, label: `${label} 팀원` }] : [...acc, cur]),
//   [],
// );
// 팀원 - 필수 팀원은 하나라도 들어가고, 값이 모두 채워져 있을 경우
