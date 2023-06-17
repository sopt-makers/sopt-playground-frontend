export interface Word {
  user: {
    id: number;
    name: string;
    profileImage?: string;
  };
  content: string;
}
