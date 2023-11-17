export type BasicCategory = {
  id: number;
  name: string;
  content: string | null;
  children: Array<BasicCategory>;
};

export type CategorySelectType = Array<BasicCategory>;
