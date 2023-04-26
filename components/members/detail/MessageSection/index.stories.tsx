import { ComponentMeta, ComponentStory } from '@storybook/react';

import ToastProvider from '@/components/common/Toast/providers/ToastProvider';
import MessageSection from '@/components/members/detail/MessageSection';

export default {
  component: MessageSection,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} as ComponentMeta<typeof MessageSection>;

const Template: ComponentStory<typeof MessageSection> = (args) => <MessageSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '남주영',
  email: 'njy1007@gmail.com',
  memberId: '8',
};
Default.storyName = '기본';

export const NoMessage = Template.bind({});
NoMessage.args = {
  name: '남주영',
  email: '',
  memberId: '8',
};
NoMessage.storyName = '이메일 없는 유저';
