export interface Word {
  user: {
    id: number;
    name: string;
    profileImage?: string;
  };
  content: string;
}

export interface ActiveWordchain {
  id: number;
  initial: {
    word: string;
    userName: string;
  };
  order: number;
  wordList: Word[];
}

export interface FinishedWordchain extends ActiveWordchain {
  winnerName: string;
}
