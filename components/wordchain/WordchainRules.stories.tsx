import { ComponentMeta, ComponentStory } from '@storybook/react';

import WordchainRules from './WordchainRules';

export default {
  component: WordchainRules,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof WordchainRules>;

const Template: ComponentStory<typeof WordchainRules> = (args) => <WordchainRules {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
