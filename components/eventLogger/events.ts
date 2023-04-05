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
    method: 'facebook' | 'google';
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

export interface PageviewEvents {
  mamberPageList: {
    //
  };
  memberCard: MemberCard;
  projectCard: ProjectCard;
}
