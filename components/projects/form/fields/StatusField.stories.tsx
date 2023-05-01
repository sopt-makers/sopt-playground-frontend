import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import StatusField from './StatusField';

export default {
  component: StatusField,
} as ComponentMeta<typeof StatusField>;

const Template: ComponentStory<typeof StatusField> = (args) => <StatusField {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';

export const WithStatus = () => {
  const [value, setValue] = useState({ isAvailable: false, isFounding: false });

  return <StatusField value={value} onChange={setValue} />;
};
