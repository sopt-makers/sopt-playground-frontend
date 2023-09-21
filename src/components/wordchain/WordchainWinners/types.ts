export interface Winner {
  roomId: number;
  winner: {
    id: number;
    profileImage: string;
    name: string;
  };
}
