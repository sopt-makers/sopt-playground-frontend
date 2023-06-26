import { Meta } from '@storybook/react';

import Text from '@/components/common/Text';

export default {
  component: Text,
} as Meta<typeof Text>;

export const Default = {
  args: {
    children: '텍스트',
  },

  name: '기본',
};
