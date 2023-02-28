import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import CategoryField from './CategoryField';

export default {
  component: CategoryField,
} as ComponentMeta<typeof CategoryField>;

const Template: ComponentStory<typeof CategoryField> = (args) => <CategoryField {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';

export const WithState: ComponentStory<typeof CategoryField> = (args) => {
  const [value, onChange] = useState<string | null>(null);

  return <CategoryField {...args} value={value} onChange={onChange} />;
};
