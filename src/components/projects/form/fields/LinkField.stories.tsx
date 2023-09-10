import { Meta } from '@storybook/react';

import { linkTitles } from '@/components/projects/form/constants';

import LinkField from './LinkField';

export default {
  component: LinkField,
} as Meta<typeof LinkField>;

export const Default = {
  args: {
    value: {
      linkTitle: linkTitles[0],
      linkUrl: '',
    },
    onChange: () => {
      //
    },
  },

  name: '기본',
};
