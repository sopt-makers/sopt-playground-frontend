import { colors } from '@sopt-makers/colors';

export const menuList: {
  title: string;
  mainColor: keyof typeof colors;
  textColor: keyof typeof colors;
  id: 'sopt' | 'playground' | 'my-pg';
}[] = [
  { title: '솝트', mainColor: 'blue400', textColor: 'white', id: 'sopt' },
  { title: '플레이그라운드', mainColor: 'orange400', textColor: 'white', id: 'playground' },
  { title: '마이 플그', mainColor: 'yellow400', textColor: 'black', id: 'my-pg' },
];
