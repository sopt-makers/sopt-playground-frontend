export type BasicCategory = {
  id: number;
  name: string;
  content: string | null;
  hasAll: boolean;
  children: Array<BasicCategory>;
};

export type CategorySelectType = Array<BasicCategory>;
