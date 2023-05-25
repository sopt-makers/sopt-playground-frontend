import { DUMMY_MENTOR_DATA, DUMMY_MENTOR_ID_DATA } from '@/components/mentoring/data';

export type MentorData = typeof DUMMY_MENTOR_DATA[number];
export type MentorId = typeof DUMMY_MENTOR_ID_DATA[number];
export function isMentoringId(id: number): id is MentorId {
  return DUMMY_MENTOR_DATA.map((mentorData) => mentorData.id).includes(id as MentorId);
}
export type MentoringData<Mentor extends MentorData> = {
  [M in Mentor as M['id']]: {
    title: string;
    keywords: string[];
    introduce: string;
    howTo: string;
    target: string;
    nonTarget: string;
    mentorName: M['name'];
  };
};

interface Career {
  companyName: string;
  title: string;
  period: string;
}

interface Link {
  title: string;
  url: string;
}

export interface MentorCareer {
  careers: Career[];
  skill: string;
  links: Link[];
}
