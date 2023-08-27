import { Meta } from '@storybook/react';

import ProfileButton from '@/components/common/Header/desktop/ProfileButton';

export default {
  component: ProfileButton,
} as Meta<typeof ProfileButton>;

export const Basic = {
  args: {
    name: '박건영',
  },
};

export const WithImage = {
  args: {
    name: '유예린',
    profileImage:
      'https://user-images.githubusercontent.com/26808056/198195477-82df28fe-acb7-46b4-be0f-0610c62a8a72.png',
  },
};
