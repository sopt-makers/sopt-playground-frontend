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
  registerLink: {
    //
  };
  registerWith: {
    method: 'facebook' | 'google' | 'apple';
  };
  onboardingBannerProjectUpload: {
    //
  };
  onboardingBannerProfileUpload: {
    //
  };
  myProfile: {
    //
  };
  editProfile: {
    //
  };
  submitProfile: {
    //
  };
  aboutMakers: {
    //
  };
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
  mentoringCarouselButton: {
    //
  };
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
}

export interface SubmitEvents {
  searchMember: {
    content: string;
  };
  editProfile: {
    //
  };
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
  mamberPageList: {
    //
  };
  memberCard: MemberCard;
  projectCard: ProjectCard;
  mentoringDetail: {
    mentorId: number;
  };
}
