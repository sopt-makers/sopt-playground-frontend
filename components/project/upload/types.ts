import { ProjectUploadForm } from '@/pages/project/upload';

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
  WEB = 'web',
  APP = 'app',
}

export enum Category {
  APPJAM = 'APPJAM',
  SOPKATHON = 'SOPKATHON',
  SOPTERM = 'SOPTERM',
  STUDY = 'STUDY',
  JOINTSEMINAR = 'JOINTSEMINAR',
  ETC = 'ETC',
}

export type Generation = {
  generation?: string;
  checked: boolean;
};

export type Status = {
  isAvailable: boolean;
  isFounding: boolean;
};
