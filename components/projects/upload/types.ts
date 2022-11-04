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
  WEB = 'WEB',
  APP = 'APP',
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
  generation?: number;
  checked: boolean;
};

export type Status = {
  isAvailable: boolean;
  isFounding: boolean;
};
