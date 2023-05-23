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
}

export interface PageViewEvents {
  mamberPageList: {
    //
  };
  memberCard: MemberCard;
  projectCard: ProjectCard;
}
