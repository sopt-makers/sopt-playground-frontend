export interface UploadFeedDataType {
  mainCategoryId: number | null;
  categoryId: number | null;
  title: string | null;
  content: string;
  isQuestion: boolean;
  isBlindWriter: boolean;
  images: string[];
}
