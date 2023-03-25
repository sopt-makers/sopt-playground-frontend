import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import GenerationSelect from './GenerationSelect';

export default {
  component: GenerationSelect,
} as ComponentMeta<typeof GenerationSelect>;

const Template: ComponentStory<typeof GenerationSelect> = (args) => <GenerationSelect {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';

export const WithState = () => {
  const [value, onChange] = useState<string>();

  return <GenerationSelect value={value} onChange={onChange} />;
};
