import { Meta } from '@storybook/react';

import OnBoardingBanner from '@/components/members/main/MemberList/OnBoardingBanner';

export default {
  component: OnBoardingBanner,
} as Meta<typeof OnBoardingBanner>;

export const Basic = {
  args: {
    name: '박건영',
  },

  name: '기본',
};
