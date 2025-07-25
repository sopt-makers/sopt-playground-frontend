export interface FeedDataType {
  categoryId: number | null;
  title: string;
  content: string;
  isQuestion: boolean;
  isBlindWriter: boolean;
  images: string[];
  vote: VoteData;
  group: string; // @todo 임시 모임 선택 값 추가
  mention: {
    userIds: number[];
    writerName?: string;
    webLink?: string;
  } | null;
}

export interface PostedFeedDataType extends FeedDataType {
  link: string | null;
}

export interface EditFeedDataType extends FeedDataType {
  postId: number | null;
}

type VoteData = {
  isMultiple: boolean;
  voteOptions: string[];
} | null;
