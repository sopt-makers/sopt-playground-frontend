export interface ServiceCategoryRankType {
  category: string;
  count: number;
}

export interface PopularMeetingSpotRankType {
  spot: string;
  ratio: number;
  count: number;
}

interface NewSignUpPartUserCountType {
  part: string;
  count: number;
}

interface WordChainGameInfoType {
  wordList: string[];
  playCount: number;
}

interface ComminityReactionInfoType {
  likeCount: number;
  commentCount: number;
}

interface CrewPopularGroupInfoType {
  id: number;
  imageUrl: string;
  groupName: string;
  feedCount: number;
}

interface CoffeeChatHistoryInfoType {
  titleList: string[];
  sendCount: number;
  openCount: number;
}

export interface ReportDataType {
  // 솝트
  TotalServiceCount: number;
  ServiceCategoryRankTable: ServiceCategoryRankType[];
  PopularMeetingSpotRankTable: PopularMeetingSpotRankType[];
  NewSignUpUserCount: number;
  NewSignUpPartUserCountTable: NewSignUpPartUserCountType[];
  // 플그
  TotalVisitCount: number;
  PopularVisitDays: string;
  UserMbtiRankTable: { type: string; count: number }[];
  WordChainGameInfoTable: WordChainGameInfoType;
  ComminityReactionInfoTable: ComminityReactionInfoType;
  CrewPopularGroupInfoTable: CrewPopularGroupInfoType;
  CrewTotalGroupUserCount: number;
  CoffeeChatHistoryInfoTable: CoffeeChatHistoryInfoType;
  CoffeeChatTotalVisitCount: number;
}
