import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import GenerationField from './GenerationField';

export default {
  component: GenerationField,
  decorators: [],
} as Meta<typeof GenerationField>;

export const Default = {
  args: {},
  name: '기본',
};

export const WithState: StoryObj<typeof GenerationField> = {
  render: function Render(args) {
    const [value, setValue] = useState<string | null>(null);

    return <GenerationField {...args} value={value} onChange={setValue} />;
  },
};
