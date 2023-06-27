import { ComponentMeta, ComponentStory } from '@storybook/react';

import WordchainMessage from './WordchainMessage';

export default {
  component: WordchainMessage,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof WordchainMessage>;

const Template: ComponentStory<typeof WordchainMessage> = (args) => <WordchainMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'word',
  user: {
    id: 1,
    name: '남주영',
    profileImage:
      'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
  },
  word: '사과',
};
Default.storyName = '기본';

export const Helper = Template.bind({});
Helper.args = {
  type: 'helper',
  word: `'과'로 시작하는 단어는?`,
};

export const StartWord = Template.bind({});
StartWord.args = {
  type: 'startWord',
  word: '토스',
};
