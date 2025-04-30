type MemberCard = {
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

export type UserProperties = {
  id: number;
  major: string | null;
  organization: string | null;
  job: string | null;
  part: string[];
  generation: number[];
  coffeeChatStatus: string;
  receivedCoffeeChatCount: number;
  sentCoffeeChatCount: number;
  uploadSopticleCount: number;
  uploadReviewCount: number;
};

type GotoCoffeechat = {
  organization: string;
  job: string;
  generation: number[];
  part: string[];
};

type Coffeechat = {
  career: string;
  organization: string;
  job: string;
  bio: string;
  section: string[];
  title: string;
  topic_tag: string[];
  topic_detail: string;
  meeting_type: string;
  guideline: string;
  generation: number[];
  part: string[];
};

export interface ClickEvents {
  memberCard: MemberCard;
  projectCard: { id: number };
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
  reviewUpload: undefined;
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
    category: string;
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
    category: string;
  };
  feedUnlike: {
    feedId: string;
    category: string;
  };

  //환영배너 타임캡솝 cta 버튼 클릭
  bannerTimeCapsule: {
    isAlreadySubmitted: boolean;
  };
  profileUploadTimeCapsule: undefined;

  // 다짐메시지 노출
  saveResolutionImage: undefined;
  bannerOpenResolution: undefined;
  bannerOpenMyReport: undefined;

  // 프로젝트 등록 후 공유하러 가기
  clickProjectShare: undefined;
  coffeechatFilter: {
    topic_tag: string | undefined;
    career: string | undefined;
    part: string | undefined;
  };
  coffeechatCard: {
    career: string | undefined;
    organization: string | undefined | null;
    job: string | undefined;
    section: string | undefined;
    title: string | undefined;
    topic_tag: string | undefined;
    generation: number[] | undefined;
    part: string[] | undefined;
    channel: string;
  };

  coffeechatGuide: undefined;
  coffeechatBadge: undefined;
  coffeechatToggleOff: undefined;
  coffeechatToggleOn: undefined;
  skillAdd: undefined;
  messageBadge: undefined;
  gotoCoffeechat: GotoCoffeechat;

  // 광고
  ads: { id: number | undefined; bannerId: number; pageUrl: string; timeStamp: string };
  coffeechatSection: {
    section: string;
  };
  openCoffeechat: undefined;
  senderPhone: undefined;
  coffeechatBanner: undefined;
  sendCoffeechat: undefined;

  coffeechatReviewCard: undefined;

  hideAdPopupToday: undefined;
  adPopupBody: undefined;
  adPopupClose: undefined;

  clickMyReportNavbar: {
    myReportSection: string;
  };
  clickMyReportGotoProject: undefined;
  clickMyReportGotoWordchain: undefined;
  clickMyReportGotoMoimFeed: undefined;
  clickMyReportGotoCoffeesopt: undefined;

  // 다른 기능 이동 모달
  timeCapsuleGotoCrew: undefined;
  timeCapsuleGotoProject: undefined;
  timeCapsuleGotoMember: undefined;
  timeCapsuleGotoCoffeechat: undefined;

  reviewGoToHomepage: undefined; // 업로드한 활동후기 보러가기
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
  submitCommunity: {
    category: string | undefined;
  };
  editCommunity: undefined;
  // 커뮤니티(피드)
  postComment: {
    feedId: string;
    referral: 'more' | 'detail';
    isBlindWriter: boolean;
  };
  //타임캡솝 보관하기
  makeTimeCapsule: undefined;
  searchCoffeeChat: {
    search_content: string;
  };
  sendCoffeechat: {
    content: string | undefined;
    receiverId: string;
    senderId: string | undefined;
  };
  openCoffeechat: Coffeechat;
  coffeechatDelete: undefined;
  editCoffeechat: undefined;
  coffeechatReview: undefined;

  reviewUpload: undefined; // 활동후기 업로드하기
}

export interface PageViewEvents {
  memberPageList: undefined;
  memberCard: MemberCard;
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
    category: string;
  };
  ads: { bannerId: number; pageUrl: string; timeStamp: string };
  adPopup: undefined;
}
