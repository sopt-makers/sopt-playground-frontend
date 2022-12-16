import { ComponentMeta, ComponentStory } from '@storybook/react';

import CoffeeChatModal from './CoffeeChatModal';

export default {
  component: CoffeeChatModal,
} as ComponentMeta<typeof CoffeeChatModal>;

const Template: ComponentStory<typeof CoffeeChatModal> = (args) => <CoffeeChatModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '춘식이',
  profile: <img width={84} height={84} src={'/icons/icon-member.svg'} alt='profile' />,
};
Default.storyName = '기본';
