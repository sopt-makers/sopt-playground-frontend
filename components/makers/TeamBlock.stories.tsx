import { Meta } from '@storybook/react';

import TeamBlock from '@/components/makers/TeamBlock';

export default {
  component: TeamBlock,
} as Meta<typeof TeamBlock>;

export const Basic = {
  args: {
    title: 'SOPT Playground Team',
    description: 'SOPT 구성원들을 위한 서비스를 만들어요.',
    children: '',
  },

  name: '기본',
};
