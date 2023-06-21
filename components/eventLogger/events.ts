type MemberCard = {
  id: number;
  name: string;
};
type ProjectCard = {
  id: number;
  name: string;
};

export interface ClickEvents {
  memberCard: MemberCard;
  projectCard: ProjectCard;
  registerLink: undefined;
  registerWith: {
    method: 'facebook' | 'google' | 'apple';
  };
  onboardingBannerProjectUpload: undefined;
  onboardingBannerProfileUpload: undefined;
  projectUpload: {
    referral: string;
  };
  myProfile: undefined;
  editProfile: undefined;
  submitProfile: undefined;
  aboutMakers: undefined;
  filterGeneration: {
    generation: string;
  };
  filterPart: {
    part: string;
  };
  filterTeam: {
    team: string;
  };
  filterMbti: {
    mbti: string;
  };
  filterSojuCapacity: {
    sojuCapacity: string;
  };
  filterOrderBy: {
    orderBy: string;
  };
  mentoringCarouselButton: undefined;
  mentoringCard: {
    mentorId: number;
  };
  mentorProfile: {
    mentorId: number;
  };
  mentorProfileCareer: {
    mentorId: number;
  };
  mentoringApplicationButton: {
    mentorId: number;
  };
  mentorApplicationButton: undefined;
}

export interface SubmitEvents {
  searchMember: {
    content: string;
  };
  editProfile: undefined;
  verify: {
    by: 'phone' | 'email';
  };
  sendMessage: {
    category: string;
    receiverId: number;
    referral: 'mentoringDetail' | 'memberDetail' | 'memberList';
  };
}

export interface PageViewEvents {
  mamberPageList: undefined;
  memberCard: MemberCard;
  projectCard: ProjectCard;
  mentoringDetail: {
    mentorId: number;
  };
  common: Record<string, unknown>;
}
