import { FieldNamesMarkedBoolean } from 'react-hook-form';

import { ProjectUploadForm } from '@/pages/projects/upload';

export interface Period {
  startAt: string;
  endAt: string;
  isOngoing: boolean;
}

export type FormItemValue = keyof ProjectUploadForm;

export interface FormItem {
  label: string;
  value: FormItemValue;
  isDirty: (dirtyFields: FieldNamesMarkedBoolean<ProjectUploadForm>, defaultValue?: ProjectUploadForm) => boolean;
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
