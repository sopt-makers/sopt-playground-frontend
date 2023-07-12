import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import CategoryField from './CategoryField';

export default {
  component: CategoryField,
} as Meta<typeof CategoryField>;

export const Default = {
  args: {},
  name: '기본',
};

export const WithState: StoryObj<typeof CategoryField> = {
  render: function Render(args) {
    const [value, onChange] = useState<string | undefined>(undefined);

    return <CategoryField {...args} value={value} onChange={onChange} />;
  },
};
