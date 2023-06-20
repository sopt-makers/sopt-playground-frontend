export interface Word {
  user: {
    id: number;
    name: string;
    profileImage?: string;
  };
  content: string;
}

export type WordchainInfo =
  | {
      isProgress: true;
      winnerName: null;
      id: number;
      initial: {
        word: string;
        userName: string;
      };
      order: number;
      wordList: Word[];
    }
  | {
      isProgress: false;
      winnerName: string;
      id: number;
      initial: {
        word: string;
        userName: string;
      };
      order: number;
      wordList: Word[];
    };
