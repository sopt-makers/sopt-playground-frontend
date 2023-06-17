import { ComponentMeta, ComponentStory } from '@storybook/react';

import WordChatMessage from '@/components/wordchain/WordchainChatting/WordChatMessage';

export default {
  components: WordChatMessage,
} as ComponentMeta<typeof WordChatMessage>;

const Template: ComponentStory<typeof WordChatMessage> = (args) => <WordChatMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {
    id: 1,
    name: '남주영',
    profileImage:
      'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
  },
  word: '사과',
};

export const EmptyProfile = Template.bind({});
EmptyProfile.args = {
  user: {
    id: 1,
    name: '남주영',
  },
  word: '사과',
};
