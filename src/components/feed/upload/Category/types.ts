export type BasicCategory = {
  id: number;
  name: string;
  content: string | null;
  // TODO: hasAll 필수로 변경하기. 아직 서버 api 변경 중
  hasAll?: boolean;
  children: Array<BasicCategory>;
};

export type CategorySelectType = Array<BasicCategory>;
