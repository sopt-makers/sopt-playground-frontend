export interface FeedDataType {
  categoryId: number | null;
  title: string | null;
  content: string;
  isQuestion: boolean;
  isBlindWriter: boolean;
  images: string[];
}

export interface PostedFeedDataType extends FeedDataType {
  sopticleUrl: string | null;
}

export interface EditFeedDataType extends FeedDataType {
  postId: number | null;
}
