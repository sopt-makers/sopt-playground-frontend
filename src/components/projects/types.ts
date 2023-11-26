export interface Period {
  startAt: string;
  endAt: string;
  isOngoing: boolean;
}

export enum ServiceType {
  WEB = 'WEB',
  APP = 'APP',
}

export type Category = 'APPJAM' | 'SOPKATHON' | 'SOPTERM' | 'STUDY' | 'JOINTSEMINAR' | 'ETC';

export type Generation = {
  generation?: number;
  checked: boolean;
};

export type Status = {
  isAvailable: boolean;
  isFounding: boolean;
};

const LINK_TITLES = ['website', 'googlePlay', 'appStore', 'github', 'instagram', 'media'] as const;
export type LinkTitle = (typeof LINK_TITLES)[number];
