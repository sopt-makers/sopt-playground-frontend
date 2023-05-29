export interface Mentor {
  id: number;
  name: string;
}

export interface Mentoring {
  title: string;
  keywords: string[];
  introduce: string;
  howTo: string;
  target: string;
  nonTarget: string;
}

export interface MentoringData {
  mentorList: readonly Mentor[];
  mentoringByMentorId: Record<number, { mentorName: string } & Mentoring>;
}
