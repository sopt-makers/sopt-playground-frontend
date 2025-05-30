export interface FeedDataType {
  categoryId: number | null;
  title: string;
  content: string;
  isQuestion: boolean;
  isBlindWriter: boolean;
  images: string[];
}

export interface PostedFeedDataType extends FeedDataType {
  link: string | null;
}

export interface EditFeedDataType extends FeedDataType {
  postId: number | null;
}
