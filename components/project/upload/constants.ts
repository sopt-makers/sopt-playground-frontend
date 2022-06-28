import { Link } from '@/components/project/upload/LinkForm/constants';

const LATEST_TH = 30;

export const TH = Array.from({ length: LATEST_TH }, (_, i) => i + 1).reverse();

// TODO: 서버쪽 인터페이스에 맞게 수정
export enum OfficialActivitiy {
  APPJAM = 'APPJAM',
  SOPKATHON = 'SOPKATHON',
  SOPTERM = 'SOPTERM',
  STUDY = 'STUDY',
  JOINTSEMINAR = 'JOINTSEMINAR',
  ETC = 'ETC',
}

export const officiallActivityLabel: Record<OfficialActivitiy, string> = {
  [OfficialActivitiy.APPJAM]: '앱잼',
  [OfficialActivitiy.SOPKATHON]: '솝커톤',
  [OfficialActivitiy.SOPTERM]: '솝텀 프로젝트',
  [OfficialActivitiy.STUDY]: '스터디',
  [OfficialActivitiy.JOINTSEMINAR]: '합동 세미나',
  [OfficialActivitiy.ETC]: '기타',
};

export enum ServiceType {
  WEB = 'web',
  APP = 'app',
}

export interface TermDate {
  dateFrom: string;
  dateTo: string;
  isOngoing: boolean;
}

export interface ProjectUploadForm {
  name: string;
  th: string;
  thChecked: boolean; // 특정 기수 활동으로 진행하지 않았음
  officialActivity: OfficialActivitiy;
  isAvailable: boolean;
  isFounding: boolean;
  originalMembers: any;
  additionalMembers: any;
  serviceType: ServiceType[];
  termDate: TermDate;
  description: string;
  logoImage: File;
  thumbnailImage: File;
  projectImage: File;
  link: Link;
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
    value: 'th',
    isDirty: false,
    isRequired: false,
  },
  {
    label: '진행유형',
    value: 'officialActivity',
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
    value: 'termDate',
    isDirty: false,
    isRequired: true,
  },
  {
    label: '프로젝트 한줄 소개',
    value: 'description',
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
