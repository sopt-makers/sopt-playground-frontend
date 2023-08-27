export interface EntryWordchain {
  wordList: Word[];
  startWord: string;
  currentWinner: {
    id: number;
    profileImage: string;
    name: string;
  } | null;
  nextSyllable: string;
}

interface Word {
  word: string;
  user: {
    id: number;
    profileImage: string;
    name: string;
  };
}
