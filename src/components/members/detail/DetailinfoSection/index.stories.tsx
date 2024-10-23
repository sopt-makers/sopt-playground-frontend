import { Meta } from '@storybook/react';

import DetailInfoSection from './index';

export default {
  component: DetailInfoSection,
} as Meta<typeof DetailInfoSection>;

export const Default = {
  args: {
    profile: {
      birthday: '2000-09-09',
      university: '서울대학교',
      major: '컴퓨터공학',
      address: '어린이대공원역',
    },
  },
};
