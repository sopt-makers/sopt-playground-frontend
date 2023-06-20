import { ComponentMeta, ComponentStory } from '@storybook/react';

import WordChainEntry from './WordChainEntry';

export default {
  component: WordChainEntry,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof WordChainEntry>;

const Template: ComponentStory<typeof WordChainEntry> = (args) => <WordChainEntry {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
