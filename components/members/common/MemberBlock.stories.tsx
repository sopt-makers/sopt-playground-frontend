import { Meta } from '@storybook/react';

import MemberBlock from '@/components/members/common/MemberBlock';

export default {
  component: MemberBlock,
} as Meta<typeof MemberBlock>;

export const Basic = {
  args: {
    name: '박건영',
    position: '프론트엔드 개발자',
    imageUrl: 'https://dummyimage.com/300x300/262d90/ffffff&text=T',
    badges: ['29기', '메이커스'],
  },

  name: '기본',
};

export const WithoutImage = {
  args: {
    name: '박건영',
    position: '프론트엔드 개발자',
  },

  name: '이미지 없음',
};
