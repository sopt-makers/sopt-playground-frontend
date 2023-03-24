import { ComponentMeta, ComponentStory } from '@storybook/react';

import PartItem from './PartItem';

export default {
  component: PartItem,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof PartItem>;

const Template: ComponentStory<typeof PartItem> = (args) => <PartItem {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
