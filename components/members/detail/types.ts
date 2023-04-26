export type ProjectCategory = 'APPJAM' | 'SOPKATHON' | 'SOPTERM' | 'STUDY' | 'JOINTSEMINAR' | 'ETC';

export type Career =
  | {
      companyName: string;
      title: string;
      startDate: string;
      endDate: null;
      isCurrent: true;
    }
  | {
      companyName: string;
      title: string;
      startDate: string;
      endDate: string;
      isCurrent: false;
    };
