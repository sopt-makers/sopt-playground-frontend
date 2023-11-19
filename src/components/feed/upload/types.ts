export interface UploadFeedDataType {
  mainCategoryId: number;
  categoryId: number;
  title: string | null;
  content: string;
  isQuestion: boolean;
  isBlindWriter: boolean;
  images: string[];
}
