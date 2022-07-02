import { Link } from '@/components/project/upload/LinkForm/constants';
import { ProjectUploadForm } from '@/pages/project/upload';

const LATEST_GENERATION = 30;

export const GENERATION = Array.from({ length: LATEST_GENERATION }, (_, i) => i + 1).reverse();

export enum Category {
  APPJAM = 'APPJAM',
  SOPKATHON = 'SOPKATHON',
  SOPTERM = 'SOPTERM',
  STUDY = 'STUDY',
  JOINTSEMINAR = 'JOINTSEMINAR',
  ETC = 'ETC',
}

export const categoryLabel: Record<Category, string> = {
  [Category.APPJAM]: '앱잼',
  [Category.SOPKATHON]: '솝커톤',
  [Category.SOPTERM]: '솝텀 프로젝트',
  [Category.STUDY]: '스터디',
  [Category.JOINTSEMINAR]: '합동 세미나',
  [Category.ETC]: '기타',
};

export enum ServiceType {
  WEB = 'web',
  APP = 'app',
}

export interface Period {
  startAt: Date;
  endAt: Date;
  isOngoing: boolean;
}

export type FormItemValue = keyof ProjectUploadForm;

export interface FormItem {
  label: string;
  value: FormItemValue;
  isDirty: boolean;
  isRequired: boolean;
}

export const formItems: FormItem[] = [
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
    label: '진행유형',
    value: 'category',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '앱잼 팀원',
    value: 'originalMembers',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '추가 합류한 팀원',
    value: 'additionalMembers',
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
