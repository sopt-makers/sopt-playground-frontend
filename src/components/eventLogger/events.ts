type MemberCard = {
  id: number;
  name: string;
};
type ProjectCard = {
  id: number;
  name: string;
};
type CommunityFeedData = {
  categoryId: number;
  title: string | null;
  content: string;
  isQuestion: boolean;
  isBlindWriter: boolean;
  images: string[];
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
  wordchainEntry: undefined;
  communityRulesClick: undefined;
  communityUploadCodeButton: undefined;
  quitUploadCommunity: {
    feedData: CommunityFeedData;
  };
  // 커뮤니티(피드)
  feedListCategoryFilter: {
    category: string;
  };
  feedCard: {
    feedId: string;
  };
  feedShareButton: {
    feedId: string;
    referral: 'list' | 'more' | 'detail';
  };
  feedBackButton: {
    feedId: string;
    referral: 'more' | 'detail';
  };
  feedCategoryChipLink: {
    feedId: string;
  };
  feedUploadButton: undefined;
  feedLike: {
    feedId: string;
  };
  feedUnlike: {
    feedId: string;
  };

  //다짐메시지
  welcomeBannerResolution: {
    isAlreadySubmitted: boolean;
  };
  profileUploadResolution: undefined;
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
  projectUpload: {
    writerId: string;
  };
  projectEdit: {
    projectId: string;
    editorId: string;
  };
  postWordchain: {
    word: string;
  };
  wordchainNewGame: undefined;
  submitCommunity: undefined;
  editCommunity: undefined;
  // 커뮤니티(피드)
  postComment: {
    feedId: string;
    referral: 'more' | 'detail';
    isBlindWriter: boolean;
  };
  //다짐메시지
  postResolution: undefined;
}

export interface PageViewEvents {
  mamberPageList: undefined;
  memberCard: MemberCard;
  projectCard: ProjectCard;
  mentoringDetail: {
    mentorId: number;
  };
  wordchain: undefined;
  // 커뮤니티(피드)
  feedList: undefined;
  feedDetail: {
    feedId: string;
  };
}

export interface ImpressionEvents {
  feedCard: {
    feedId: string;
  };
}
