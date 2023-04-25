import { ComponentMeta, ComponentStory } from '@storybook/react';

import CoffeeChatModal from './MessageModal';

export default {
  component: CoffeeChatModal,
} as ComponentMeta<typeof CoffeeChatModal>;

const Template: ComponentStory<typeof CoffeeChatModal> = (args) => <CoffeeChatModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '춘식이',
};
Default.storyName = '기본';
