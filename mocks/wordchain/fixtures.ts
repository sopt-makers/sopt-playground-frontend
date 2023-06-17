export interface Winner {
  gameNum: number;
  user: {
    userId: number;
    profileImage: string;
    userName: string;
  };
}

export const fixtures: Winner[] = [
  {
    gameNum: 3,
    user: {
      userId: 1,
      profileImage: '~',
      userName: '이준호',
    },
  },
  {
    gameNum: 2,
    user: {
      userId: 2,
      profileImage: '~',
      userName: '남주영',
    },
  },
  {
    gameNum: 1,
    user: {
      userId: 3,
      profileImage: '~',
      userName: '한유진',
    },
  },
];
