export type ProjectCategory = 'APPJAM' | 'SOPKATHON' | 'SOPTERM' | 'STUDY' | 'JOINTSEMINAR' | 'ETC';

export interface Career {
  companyName: string;
  title: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
}
