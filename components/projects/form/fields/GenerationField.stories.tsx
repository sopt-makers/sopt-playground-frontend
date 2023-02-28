import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import GenerationField from './GenerationField';

export default {
  component: GenerationField,
  decorators: [],
} as ComponentMeta<typeof GenerationField>;

const Template: ComponentStory<typeof GenerationField> = (args) => <GenerationField {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';

export const WithState: ComponentStory<typeof GenerationField> = (args) => {
  const [value, setValue] = useState<string | null>(null);

  return <GenerationField {...args} value={value} onChange={setValue} />;
};
