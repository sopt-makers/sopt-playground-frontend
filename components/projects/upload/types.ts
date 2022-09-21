import { ProjectUploadForm } from '@/pages/projects/upload';

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

export enum ServiceType {
  WEB = '웹',
  APP = '앱',
}

export enum Category {
  APPJAM = '앱잼',
  SOPKATHON = '솝커톤',
  SOPTERM = '솝텀',
  STUDY = '스터디',
  JOINTSEMINAR = '합동세미나',
  ETC = '기타',
}

export type Generation = {
  generation?: number;
  checked: boolean;
};

export type Status = {
  isAvailable: boolean;
  isFounding: boolean;
};

export type Toast = {
  isActive: boolean;
  message: string;
};
