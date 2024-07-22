import { Meta } from '@storybook/react';

import ReviewCard from '@/components/remember/reviews/ReviewCard';

export default {
  component: ReviewCard,
} as Meta<typeof ReviewCard>;

export const Default = {
  args: {
    id: 1,
    message: '솝트 좋아요!\n솝트 좋아요!\n솝트 좋아요!',
  },
  name: '리뷰카드 기본',
};

export const Long = {
  args: {
    id: 2,
    message:
      '솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요!솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요!솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! 솝트에서 이루고 싶은 것, \n현재의 다짐 등 34기 활동을 시작하는 \n스스로에게 하고 싶은 말을 자유롭게 \n적어주세요! ',
  },
  name: '리뷰카드 긴 버전',
};
