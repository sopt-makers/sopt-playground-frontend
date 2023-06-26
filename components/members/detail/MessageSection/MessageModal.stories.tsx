import { Meta } from '@storybook/react';

import MessageModal from './MessageModal';

export default {
  component: MessageModal,
} as Meta<typeof MessageModal>;

export const Default = {
  args: {
    name: '춘식이',
  },

  name: '기본',
};
