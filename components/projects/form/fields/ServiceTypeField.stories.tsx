import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import ServiceTypeField, { serviceType } from './ServiceTypeField';

export default {
  component: ServiceTypeField,
} as ComponentMeta<typeof ServiceTypeField>;

const Template: ComponentStory<typeof ServiceTypeField> = (args) => <ServiceTypeField {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: [serviceType.APP],
  onChange: () => {
    //
  },
};
Default.storyName = '기본';

export const WithState = () => {
  const [value, onChange] = useState<string[]>([]);

  return <ServiceTypeField value={value} onChange={onChange} />;
};
