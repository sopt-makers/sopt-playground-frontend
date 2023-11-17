export interface TagSelectType {
  id: number;
  name: string;
  articleType: string;
}

export interface CategorySelectType {
  id: number;
  name: string;
  showAllTag: boolean;
  content: string;
  tags: TagSelectType[];
}
