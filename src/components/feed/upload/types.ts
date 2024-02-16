export interface FeedDataType {
  categoryId: number | null;
  title: string | null;
  content: string;
  isQuestion: boolean;
  isBlindWriter: boolean;
  images: string[];
}

export interface PostedFeedDataType extends FeedDataType {
  id: number;
}

export interface EditFeedDataType extends FeedDataType {
  postId: number | null;
}
