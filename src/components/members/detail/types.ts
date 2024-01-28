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

export type MeetingType = {
  id: number;
  isMeetingLeader: boolean;
  title: string;
  imageUrl: string;
  category: string;
  isActiveMeeting: boolean;
  mstartDate: string;
  mendDate: string;
};
