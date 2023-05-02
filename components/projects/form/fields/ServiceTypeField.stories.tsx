import { ComponentMeta, ComponentStory } from '@storybook/react';

import ServiceTypeField from './ServiceTypeField';

export default {
  component: ServiceTypeField,
} as ComponentMeta<typeof ServiceTypeField>;

const Template: ComponentStory<typeof ServiceTypeField> = (args) => <ServiceTypeField {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
