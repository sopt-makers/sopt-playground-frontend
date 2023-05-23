import { ComponentMeta, ComponentStory } from '@storybook/react';

import OrderBySelect from './OrderBySelect';

export default {
  component: OrderBySelect,
} as ComponentMeta<typeof OrderBySelect>;

const Template: ComponentStory<typeof OrderBySelect> = (args) => <OrderBySelect {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
