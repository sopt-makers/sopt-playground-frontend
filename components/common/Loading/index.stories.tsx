import { Meta } from '@storybook/react';

import Loading from '.';

export default {
  component: Loading,
} as Meta<typeof Loading>;

export const Default = {};

export const FullPage = {
  args: {
    type: 'fullPage',
  },
};
