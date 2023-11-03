export interface TagSelectType {
  id: string;
  name: string;
  articleType: string;
}

export interface CategorySelectType {
  id: string;
  name: string;
  showAllTag: boolean;
  content: string;
  tags: TagSelectType[];
}
