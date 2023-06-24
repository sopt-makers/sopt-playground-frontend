import { Meta } from '@storybook/react';

import PersonBlock from '@/components/makers/PersonBlock';

export default {
  component: PersonBlock,
} as Meta<typeof PersonBlock>;

export const WithImage = {
  args: {
    name: '박건영',
    position: '프론트엔드 개발자',
    imageUrl: 'https://dummyimage.com/300x300/262d90/ffffff&text=T',
  },

  name: '이미지 있음',
};

export const WithoutImage = {
  args: {
    name: '박건영',
    position: '프론트엔드 개발자',
  },

  name: '이미지 없음',
};
