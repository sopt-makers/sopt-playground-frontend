import { ComponentMeta, ComponentStory } from '@storybook/react';

import MessageModal from './MessageModal';

export default {
  component: MessageModal,
} as ComponentMeta<typeof MessageModal>;

const Template: ComponentStory<typeof MessageModal> = (args) => <MessageModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '춘식이',
};
Default.storyName = '기본';
