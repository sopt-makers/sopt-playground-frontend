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

type Coffeechat = {
  career: string;
  organization: string;
  job: string;
  bio: string;
  section: string[];
  title: string;
  topicTag: string[];
  topicDetail: string;
  meetingType: string;
  guideline: string;
  generation: number[];
  part: string[];
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
  filterEmployed: {
    employed: string;
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

  // 프로젝트 등록 후 공유하러 가기
  clickProjectShare: undefined;

  coffeechatCard: undefined;
  coffeechatGuide: undefined;
  openToCoffeechat: undefined;
  coffeechatBadge: undefined;
  memberBadge: undefined;
  coffeechatToggleOff: undefined;
  coffeechatToggleOn: undefined;
  skillAdd: undefined;

  // 광고
  ads: { id: number | undefined; bannerId: number; pageUrl: string; timeStamp: string };
  sendCoffeechat: undefined;
  senderPhone: undefined;
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

  openCoffeechat: Coffeechat;
  sendCoffeechat: Coffeechat & { sendContent: string };

  coffeechatDelete: undefined;
  editCoffeechat: undefined;
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
  ads: { bannerId: number; pageUrl: string; timeStamp: string };
}
