import { ComponentMeta, ComponentStory } from '@storybook/react';

import StartWordChatMessage from '@/components/wordchain/StartWordChatMessage';

export default {
  components: StartWordChatMessage,
} as ComponentMeta<typeof StartWordChatMessage>;

const Template: ComponentStory<typeof StartWordChatMessage> = (args) => <StartWordChatMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  word: '사과',
};
