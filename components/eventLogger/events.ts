export interface ClickEvents {
  memberCard: {
    id: number;
    name: string;
  };
  projectCard: {
    id: number;
    name: string;
  };
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
