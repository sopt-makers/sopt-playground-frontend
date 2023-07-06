import { Meta } from '@storybook/react';

import PartItem from './PartItem';

export default {
  component: PartItem,
  parameters: {},
  decorators: [],
} as Meta<typeof PartItem>;

export const Default = {
  args: {
    generation: '29',
    part: '웹',
    activities: [
      { type: '앱잼', name: '팀블', href: 'https://playground.sopt.org' },
      { type: '솝커톤', name: '당뻔', href: 'https://playground.sopt.org' },
    ],
    teams: ['운영팀'],
  },

  name: '기본',
};
